import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, shorturl } = body || {};

    if (!url || !shorturl) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Both url and shorturl are required.",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const existing = await collection.findOne({ shorturl });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Short URL already exists. Please choose another one.",
        },
        { status: 409 },
      );
    }

    await collection.insertOne({ url, shorturl });

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "URL Generated Successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
