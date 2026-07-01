"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// We create a separate form component so we can wrap it in Suspense 
// (Next.js requires this when using useSearchParams in App Router)
const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Grabs '?token=XYZ' from the URL
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Quick frontend check
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!token) {
      return setError("Invalid reset link. Please request a new one.");
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        // Automatically send them back to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-6 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Create New Password
        </h1>
        
        <p className="text-gray-300 text-center mb-8 text-sm">
          Please enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* New Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          {/* Success Message */}
          {message && (
            <div className="text-green-400 text-sm text-center font-semibold bg-green-500/10 py-3 px-4 rounded-lg border border-green-500/20">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center font-semibold bg-red-500/10 py-3 px-4 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              "Reset Password 🔒"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main page component wrapped in Suspense
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;