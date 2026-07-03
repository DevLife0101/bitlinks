import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"; 
import GoogleProvider from "next-auth/providers/google"; 
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("bitlinks");
        
        const formattedEmail = credentials.email.toLowerCase().trim();
        const user = await db.collection("users").findOne({ email: formattedEmail });
        
        if (!user) throw new Error("No user found with this email");

        // Check if the user signed up with Google/GitHub previously
        if (!user.password) {
           throw new Error("Please log in using the provider you signed up with (Google/GitHub).");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return { id: user._id, name: user.name, email: user.email };
      }
    })
  ],
  
  // THE FIX: Intercept the login to save OAuth users to MongoDB
  callbacks: {
    async signIn({ user, account }) {
      // We only need to do this for Google and GitHub. 
      // Credentials already handles its own database logic in the signup route.
      if (account.provider === "google" || account.provider === "github") {
        try {
          const client = await clientPromise;
          const db = client.db("bitlinks");
          const formattedEmail = user.email.toLowerCase().trim();

          // Check if this user already exists in our database
          const existingUser = await db.collection("users").findOne({ email: formattedEmail });

          // If they don't exist, create a new account for them automatically!
          if (!existingUser) {
            await db.collection("users").insertOne({
              name: user.name,
              email: formattedEmail,
              image: user.image, // NextAuth provides their profile picture URL!
              authProvider: account.provider, // Track how they signed up
              createdAt: new Date(),
            });
          }
          
          return true; // Continue with the login
        } catch (error) {
          console.error("Error saving OAuth user to database:", error);
          return false; // Deny login if database connection fails
        }
      }
      
      return true; // Allow Credentials logins to proceed normally
    },
  },

  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };