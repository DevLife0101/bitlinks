"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ROUTE GUARD: If the user is definitely not logged in, kick them to the login page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // LOADING STATE: Show a smooth spinner while NextAuth checks their cookies
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // LOGGED IN STATE: The actual Dashboard UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-400 mt-2">Here is what is happening with your links today.</p>
          </div>
          
          <Link 
            href="/shorten" 
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2"
          >
            <span>+</span> Create New Link
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stat Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-gray-400 font-medium mb-2">Total Links</h3>
            <p className="text-4xl font-bold text-white">0</p>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-gray-400 font-medium mb-2">Total Clicks</h3>
            <p className="text-4xl font-bold text-purple-400">0</p>
          </div>
          
          {/* Stat Card 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-gray-400 font-medium mb-2">Active Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-lg font-bold text-green-400">Pro Account</p>
            </div>
          </div>
        </div>

        {/* Recent Links Table Area */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Your Recent Links</h2>
          
          {/* Placeholder for empty state */}
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">No links found</h3>
            <p className="text-gray-400 max-w-md">
              You haven't shortened any URLs yet. Click the button above to create your first powerful short link!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;