import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// This is a GET request because users are simply visiting a URL in their browser
export async function GET(request, { params }) {
  // Grab the short text from the URL (e.g., "my-link")
  const shorturl = params.shorturl;

  try {
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url"); // Using your exact collection name

    // 1. Find the link in your database
    const link = await collection.findOne({ shorturl });

    // 2. If the link doesn't exist (someone typed a bad URL), send them home
    if (!link) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 3. THE MAGIC: Tell MongoDB to increment the "clicks" number by 1
    await collection.updateOne(
      { shorturl: shorturl },
      { $inc: { clicks: 1 } }
    );

    // 4. Instantly redirect the user to their final destination!
    return NextResponse.redirect(link.url);

  } catch (error) {
    console.error("Error during redirection:", error);
    // If the database crashes, just safely send them to your homepage
    return NextResponse.redirect(new URL('/', request.url));
  }
}