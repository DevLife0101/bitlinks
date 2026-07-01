"use client";
import React, { useState } from "react";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setEmail(""); // Clear the input field
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
          Forgot Password
        </h1>
        
        <p className="text-gray-300 text-center mb-8 text-sm">
          Enter your email address and we will send you a secure link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 placeholder-gray-400"
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
                Sending Link...
              </>
            ) : (
              "Send Reset Link 📧"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Remember your password?{" "}
          <Link href="/login" className="text-purple-400 hover:text-pink-400 font-semibold transition-colors">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;