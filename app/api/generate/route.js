import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, shorturl } = body || {};

    // 1. Check if fields exist
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

    // 2. NEW: Check if the provided URL is actually a valid web address
    try {
      new URL(url); // This will throw an error if the URL is invalid
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
    const collection = db.collection("url");

    // 3. Check for duplicates
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

    // 4. Insert into database
    await collection.insertOne({ url, shorturl });

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