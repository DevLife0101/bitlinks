import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

// THIS TRICK PREVENTS NEXT.JS FROM CACHING THE REDIRECT!
export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  // Await the params first
  const paramsResolved = await params;
  const shorturl = paramsResolved.shorturl;

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  // 1. Find the document
  const doc = await collection.findOne({ shorturl: shorturl });
  
  if (doc) {
    // 2. Increment the click count by 1 right before redirecting
    await collection.updateOne(
      { shorturl: shorturl },
      { $inc: { clicks: 1 } }
    );

    // 3. Send them to the original link
    redirect(doc.url);
  } else {
    // If it doesn't exist, send them back to the homepage
    redirect(process.env.NEXT_PUBLIC_HOST);
  }
}