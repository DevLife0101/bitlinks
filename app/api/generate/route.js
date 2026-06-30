import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
// 1. NEW IMPORTS: Bring in NextAuth to check sessions
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    // 2. THE MAGIC: Check if the user is currently logged in
    const session = await getServerSession(authOptions);

    const body = await request.json();
    const { url, shorturl } = body || {};

    // 3. Check if fields exist
    if (!url || !shorturl) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Both url and shorturl are required.",
        },
        { status: 400 }
      );
    }

    // 4. Check if the provided URL is actually a valid web address
    try {
      new URL(url); 
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Please provide a valid URL (e.g., https://example.com).",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url"); // Kept your exact collection name!

    // 5. Check for duplicates
    const existing = await collection.findOne({ shorturl });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Short URL already exists. Please choose another one.",
        },
        { status: 409 }
      );
    }

    // 6. UPDATED: Insert into database with user data and timestamp!
    await collection.insertOne({ 
      url, 
      shorturl,
      clicks: 0, // Added this so your dashboard has a starting number to track!
      createdAt: new Date(),
      userEmail: session ? session.user.email : null // Attaches email if logged in, null if anonymous
    });

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "URL Generated Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}