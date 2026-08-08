import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Initialize Razorpay using your secret environment variables
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount } = await request.json();

    const options = {
      amount: amount * 100, // Razorpay strictly expects amounts in paisa (₹99 = 9900 paisa)
      currency: "INR",
      receipt: "rcp_" + Math.random().toString(36).substring(7),
    };

    // Securely create the order on the server
    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ success: false, message: "Could not create order" }, { status: 500 });
  }
}