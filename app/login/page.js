"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loading(true);
    setError("");

    try {
      // Use NextAuth's signIn function
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        // If password is wrong or user doesn't exist, show the error
        setError(res.error);
        setLoading(false);
      } else {
        // If successful, push them to the dashboard and refresh to update the Navbar
        router.push("/dashboard");
        router.refresh(); 
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-6 py-20">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        
        <p className="text-gray-300 text-center mb-8">
          Log in to access your BitLinks dashboard.
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
                Logging in...
              </>
            ) : (
              "Log In 🚀"
            )}
          </button>
        </form>

        {/* Visual OR Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 text-sm text-gray-400 font-medium">OR</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* GitHub Authentication Button */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 hover:border-white/20 font-semibold py-3 px-4 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 mb-6"
        >
          <svg height="22" width="22" viewBox="0 0 16 16" fill="currentColor" className="text-white">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          Continue with GitHub
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don't have an account yet?{" "}
          <Link href="/signup" className="text-purple-400 hover:text-pink-400 font-semibold transition-colors">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;