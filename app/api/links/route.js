import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ADDED: This forces Next.js to run this fresh every single time!
export const dynamic = "force-dynamic"; 

// GET: Fetch all links for the logged-in user to display on the Dashboard
export async function GET(request) {
  try {
    // 1. Get the current logged-in user
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Connect to the database
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url"); // Using your exact collection name

    // 3. Find all links that belong to this user's email, sorted by newest first
    const userLinks = await collection
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, links: userLinks }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch links:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// PUT: Update the destination URL of an existing link
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  
  // Security Check: Block unauthorized users
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { shorturl, newUrl } = body;

    // Validation: Make sure they sent both pieces of data
    if (!shorturl || !newUrl) {
      return NextResponse.json({ success: false, message: "Missing data" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");

    // The Magic: Update the link in the database.
    // CRITICAL FIX: Changed collection from "links" to "url" to match your database!
    const result = await db.collection("url").updateOne(
      { shorturl: shorturl, userEmail: session.user.email },
      { $set: { url: newUrl, updatedAt: new Date() } }
    );

    // If no document was modified, they either sent a bad shorturl or tried to edit someone else's link
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Link not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Link updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}