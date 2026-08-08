"use client";
import React, { useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";

export default function UpgradeButton() {
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Ask backend to create Razorpay Order
      const orderRes = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99 }), // ₹99
      });
      const { order } = await orderRes.json();

      // 2. Configure checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "BitLinks Pro",
        description: "Upgrade to Premium Analytics & Features",
        order_id: order.id,
        handler: async function (response) {
          // 3. Cryptographic Signature Verification
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userEmail: session?.user?.email,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment Verified! You are now a Pro member. 🚀");
            window.location.reload(); // Refresh to update user UI
          } else {
            alert("Payment Verification Failed!");
          }
        },
        theme: {
          color: "#A855F7",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button 
        onClick={handlePayment} 
        disabled={isProcessing}
        className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Upgrade to Pro (₹99)"}
      </button>
    </>
  );
}