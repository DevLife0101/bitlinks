import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// This is a GET request because users are simply visiting a URL in their browser
export async function GET(request, { params }) {
  // 1. Await the params first! (Next.js 15+ requirement)
  const paramsResolved = await params;
  const shorturl = paramsResolved.shorturl;

  try {
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url"); // Using your exact collection name

    // 2. Find the link in your database
    const link = await collection.findOne({ shorturl });

    // 3. If the link doesn't exist (someone typed a bad URL), send them home
    if (!link) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 4. THE MAGIC: Tell MongoDB to increment the "clicks" number by 1
    await collection.updateOne(
      { shorturl: shorturl },
      { $inc: { clicks: 1 } }
    );

    // 5. Instantly redirect the user to their final destination!
    return NextResponse.redirect(link.url);

  } catch (error) {
    console.error("Error during redirection:", error);
    // If the database crashes, just safely send them to your homepage
    return NextResponse.redirect(new URL('/', request.url));
  }
}