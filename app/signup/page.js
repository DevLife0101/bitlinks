"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send data to the API route we created earlier
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // If successful, send them to the login page!
        router.push("/api/auth/signin"); 
      } else {
        // If the email already exists or something went wrong, show the error
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-6 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h1>
        
        <p className="text-gray-300 text-center mb-8">
          Join BitLinks to track and manage your URLs.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="px-5 py-3 rounded-xl w-full bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="text-red-400 text-sm text-center font-semibold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              "Sign Up ✨"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/api/auth/signin" className="text-purple-400 hover:text-pink-400 font-semibold transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;