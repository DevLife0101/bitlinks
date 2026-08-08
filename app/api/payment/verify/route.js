import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userEmail } = await request.json();

    // 1. Concatenate the order ID and payment ID with a pipe character
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // 2. Generate an HMAC-SHA256 hash using your secret key
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // 3. Compare the generated hash to the one Razorpay sent back
    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature!" },
        { status: 400 }
      );
    }

    // 4. Verification Passed: Update the user in MongoDB
    const client = await clientPromise;
    const db = client.db("bitlinks");
    
    await db.collection("users").updateOne(
      { email: userEmail }, 
      { $set: { isPro: true, paymentId: razorpay_payment_id } }
    );

    return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}