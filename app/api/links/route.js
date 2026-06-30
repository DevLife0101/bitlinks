import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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