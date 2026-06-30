import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  // Await params if you are using Next.js 15+
  const shorturl = (await params).shorturl;

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  // 1. Find the document
  const doc = await collection.findOne({ shorturl: shorturl });
  
  if (doc) {
    // 2. THE MAGIC: Increment the click count by 1 right before redirecting
    await collection.updateOne(
      { shorturl: shorturl },
      { $inc: { clicks: 1 } }
    );

    // 3. Send them to the original link
    redirect(doc.url);
  } else {
    // If it doesn't exist, send them back to the homepage
    redirect(`${process.env.NEXT_PUBLIC_HOST}`);
  }
}