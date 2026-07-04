import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// PUT: Update User Password
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "Missing password fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");

    // Fetch the user to verify their current password
    const user = await db.collection("users").findOne({ email: session.user.email });

    // Prevent OAuth users (Google/GitHub) from trying to set a password here
    if (!user || !user.password) {
      return NextResponse.json({ success: false, message: "OAuth users cannot change passwords here." }, { status: 403 });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Incorrect current password." }, { status: 401 });
    }

    // Hash the new password and update the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { password: hashedNewPassword } }
    );

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// DELETE: Completely wipe user account and all their links
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bitlinks");

    // 1. Delete all links associated with this user from the "url" collection
    await db.collection("url").deleteMany({ userEmail: session.user.email });

    // 2. Delete the user document from the "users" collection
    const result = await db.collection("users").deleteOne({ email: session.user.email });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}