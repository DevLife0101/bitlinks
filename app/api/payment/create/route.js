import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// Initialize Razorpay securely on the server
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount } = await request.json();

    const options = {
      amount: amount * 100, // Razorpay strictly expects amounts in paisa (e.g. 100 paisa = ₹1)
      currency: "INR",
      receipt: "rcp_" + Math.random().toString(36).substring(7),
    };

    // Create the order using your secret credentials
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, message: "Could not create order" }, { status: 500 });
  }
}