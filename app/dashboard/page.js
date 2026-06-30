"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [links, setLinks] = useState([]);
  const [fetchingLinks, setFetchingLinks] = useState(true);

  // ROUTE GUARD
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // FETCH LINKS LOGIC (UPDATED WITH CACHE FIX & FOCUS LISTENER)
  useEffect(() => {
    if (status === "authenticated") {
      const fetchLinks = async () => {
        try {
          // FIX 1: Added { cache: "no-store" } so it never loads stale data
          const res = await fetch("/api/links", { cache: "no-store" });
          const data = await res.json();
          if (data.success) {
            setLinks(data.links);
          }
        } catch (error) {
          console.error("Error fetching links:", error);
        } finally {
          setFetchingLinks(false);
        }
      };
      
      // Fetch immediately when the page loads
      fetchLinks();

      // FIX 2: Listen for the user clicking back to this tab, and refresh automatically!
      window.addEventListener("focus", fetchLinks);

      // Clean up the listener when they leave the page
      return () => {
        window.removeEventListener("focus", fetchLinks);
      };
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate total clicks from all links
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

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
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-gray-400 font-medium mb-2">Total Links</h3>
            <p className="text-4xl font-bold text-white">{links.length}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-gray-400 font-medium mb-2">Total Clicks</h3>
            <p className="text-4xl font-bold text-purple-400">{totalClicks}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-gray-400 font-medium mb-2">Active Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-lg font-bold text-green-400">Pro Account</p>
            </div>
          </div>
        </div>

        {/* Recent Links Area */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">Your Recent Links</h2>
          
          {fetchingLinks ? (
            <div className="flex justify-center py-10">
               <div className="w-8 h-8 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          ) : links.length > 0 ? (
            <div className="flex flex-col gap-4">
              {links.map((link, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-all">
                  <div className="overflow-hidden w-full md:w-2/3">
                    <a 
                      href={`/${link.shorturl}`} 
                      target="_blank" 
                      className="text-lg font-bold text-purple-400 hover:text-pink-400 transition-colors"
                    >
                      bitlinks.com/{link.shorturl}
                    </a>
                    <p className="text-gray-400 text-sm mt-1 truncate">
                      {link.url}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Clicks:</span>
                    <span className="font-bold text-white">{link.clicks || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No links found</h3>
              <p className="text-gray-400 max-w-md">
                You haven't shortened any URLs yet. Click the button above to create your first powerful short link!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;