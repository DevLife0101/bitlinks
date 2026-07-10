import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Prevents Next.js from caching the database responses
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  // Await the routing parameters
  const paramsResolved = await params;
  const shortcode = paramsResolved.shorturl;

  try {
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // 1. Find the document
    const doc = await collection.findOne({ shorturl: shortcode });

    if (doc) {
      // 2. Increment the click count by 1 in the background
      await collection.updateOne(
        { shorturl: shortcode },
        { $inc: { clicks: 1 } }
      );

      // 3. Send them to the original link WITH the SEO protection header
      return NextResponse.redirect(doc.url, {
        status: 302, // 302 Found (Temporary Redirect) is ideal for tracking links
        headers: {
          // This keeps Google from indexing this dynamic short link path
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    } else {
      // If it doesn't exist, send them back to the homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Redirect engine error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}