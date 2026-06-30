import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"; // 1. Imported the GitHub Provider
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // 2. Added GitHub Provider to the array
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
        
        // Find user by email (make sure to format it the same way!)
        const formattedEmail = credentials.email.toLowerCase().trim();
        const user = await db.collection("users").findOne({ email: formattedEmail });
        
        if (!user) throw new Error("No user found with this email");

        // Check if password matches
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return { id: user._id, name: user.name, email: user.email };
      }
    })
  ],
  // Tells NextAuth to use your custom login page
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