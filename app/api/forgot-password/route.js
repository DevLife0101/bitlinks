import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();
    const formattedEmail = email.toLowerCase().trim();

    const client = await clientPromise;
    const db = client.db("bitlinks");

    // 1. Check if user exists
    const user = await db.collection("users").findOne({ email: formattedEmail });
    
    if (!user) {
      // Security best practice: Don't reveal if an email exists or not to prevent scanning
      return NextResponse.json({ message: "If that email exists, a reset link was sent." }, { status: 200 });
    }

    // 2. Generate a secure random token and expiration time (1 hour from now)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600000; // 1 hour in milliseconds

    // 3. Save the token to the user's database record
    await db.collection("users").updateOne(
      { email: formattedEmail },
      { $set: { resetToken: resetToken, resetTokenExpiry: tokenExpiry } }
    );

    // 4. Create the Reset URL
    // Use your live URL in production, or localhost for testing
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    // 5. Send the Email using Resend
    await resend.emails.send({
      from: "BitLinks <onboarding@resend.dev>", // Resend provides this test email domain for free
      to: formattedEmail,
      subject: "Reset your BitLinks Password",
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Someone requested to reset the password for your BitLinks account.</p>
          <p>Click the button below to set a new password. This link expires in 1 hour.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #a855f7; color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
            Reset Password
          </a>
          <p style="margin-top: 32px; font-size: 12px; color: #666;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Reset email sent successfully." }, { status: 200 });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to send reset email." }, { status: 500 });
  }
}