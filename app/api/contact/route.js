import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    // 1. Destructure the new fields
    const { name, email, phone, subject, message } = body || {};

    // 2. Validate the input (Phone is optional here, but others are required)
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("messages");

    // 3. Insert all data into the database
    await collection.insertOne({
      name,
      email,
      phone: phone || "Not provided", // Save phone if provided, else note it
      subject,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}