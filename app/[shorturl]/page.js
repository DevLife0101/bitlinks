import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const shorturl = (await params).shorturl;

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shorturl: shorturl });
  console.log(doc);
  
  if (doc) {
    // If the short URL exists in the DB, send them to the original link
    redirect(doc.url);
  } else {
    // If it doesn't exist, send them back to the homepage
    redirect(`${process.env.NEXT_PUBLIC_HOST}`);
  }
}