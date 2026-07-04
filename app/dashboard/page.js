"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QRCodeDisplay from "@/components/QRCodeDisplay";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [links, setLinks] = useState([]);
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [expandedQr, setExpandedQr] = useState(null);

  // --- NEW EDIT MODAL STATE ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState(null);
  const [newUrlInput, setNewUrlInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchLinks = async () => {
        try {
          const res = await fetch("/api/links", { cache: "no-store" });
          const data = await res.json();
          if (data.success) {
            setLinks(data.links);
          }
        } catch (error) {
          console.error("Error fetching links:", error);
        } finally {
          setFetchingLinks((prev) => false); 
        }
      };
      
      fetchLinks();
      window.addEventListener("focus", fetchLinks);
      const pollInterval = setInterval(fetchLinks, 5000);

      return () => {
        window.removeEventListener("focus", fetchLinks);
        clearInterval(pollInterval);
      };
    }
  }, [status]);

  const handleShare = async (shorturl) => {
    const fullUrl = `https://bitlinks-blond.vercel.app/${shorturl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BitLinks Short URL', url: fullUrl });
      } catch (error) {
        console.log('Sharing canceled or failed.', error);
      }
    } else {
      navigator.clipboard.writeText(fullUrl);
      alert("Link copied to clipboard! 📋"); 
    }
  };

  // --- NEW HANDLERS FOR EDITING ---
  const openEditModal = (link) => {
    setCurrentEditLink(link);
    setNewUrlInput(link.url); // Pre-fill the input with their current long URL
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEditLink(null);
    setNewUrlInput("");
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const response = await fetch("/api/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shorturl: currentEditLink.shorturl,
          newUrl: newUrlInput,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Optimistically update the UI so they see the change instantly without refreshing
        setLinks(links.map(l => l.shorturl === currentEditLink.shorturl ? { ...l, url: newUrlInput } : l));
        closeEditModal();
      } else {
        alert("Failed to update: " + data.message);
      }
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Something went wrong while saving.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white px-4 sm:px-6 py-8 md:py-12 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Here is what is happening with your links today.</p>
          </div>
          
          <Link 
            href="/shorten" 
            className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2"
          >
            <span>+</span> Create New Link
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl">
            <h3 className="text-gray-400 text-sm sm:text-base font-medium mb-2">Total Links</h3>
            <p className="text-3xl sm:text-4xl font-bold text-white">{links.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl">
            <h3 className="text-gray-400 text-sm sm:text-base font-medium mb-2">Total Clicks</h3>
            <p className="text-3xl sm:text-4xl font-bold text-purple-400">{totalClicks}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 shadow-xl">
            <h3 className="text-gray-400 text-sm sm:text-base font-medium mb-2">Active Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-base sm:text-lg font-bold text-green-400">Pro Account</p>
            </div>
          </div>
        </div>

        {/* Recent Links Area */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Your Recent Links</h2>
          
          {fetchingLinks ? (
            <div className="flex justify-center py-10">
               <div className="w-8 h-8 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          ) : links.length > 0 ? (
            <div className="flex flex-col gap-4">
              {links.map((link, index) => (
                <div key={index} className="flex flex-col bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all">
                  
                  {/* Main Link Details Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 gap-4">
                    <div className="overflow-hidden w-full sm:flex-1 sm:pr-4">
                      <a 
                        href={`https://bitlinks-blond.vercel.app/${link.shorturl}`} 
                        target="_blank" 
                        className="text-base sm:text-lg font-bold text-purple-400 hover:text-pink-400 transition-colors block truncate"
                      >
                        bitlinks-blond.vercel.app/{link.shorturl}
                      </a>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate" title={link.url}>
                        {link.url}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
                      {/* Click Counter */}
                      <div className="bg-black/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/10 flex items-center gap-2 text-xs sm:text-sm">
                        <span className="text-gray-400">Clicks:</span>
                        <span className="font-bold text-white">{link.clicks || 0}</span>
                      </div>
                      
                      {/* EDIT Button (NEW) */}
                      <button
                        onClick={() => openEditModal(link)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 border bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/40"
                      >
                        Edit ✏️
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(link.shorturl)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 border bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/40"
                      >
                        Share 🚀
                      </button>
                      
                      {/* QR Code Toggle Button */}
                      <button
                        onClick={() => setExpandedQr(expandedQr === link.shorturl ? null : link.shorturl)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
                          expandedQr === link.shorturl 
                            ? "bg-white text-black border-white" 
                            : "bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/40"
                        }`}
                      >
                        {expandedQr === link.shorturl ? "Hide QR" : "Show QR 📱"}
                      </button>
                    </div>
                  </div>

                  {/* Expandable QR Code Section */}
                  {expandedQr === link.shorturl && (
                    <div className="border-t border-white/10 bg-black/30 p-4 sm:p-6 flex justify-center transition-all">
                      <QRCodeDisplay url={`https://bitlinks-blond.vercel.app/${link.shorturl}`} />
                    </div>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 sm:py-12 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5 px-4">
              <div className="text-5xl sm:text-6xl mb-4">🔗</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-2">No links found</h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-md">
                You haven't shortened any URLs yet. Click the button above to create your first powerful short link!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- THE EDIT MODAL --- */}
      {isEditModalOpen && currentEditLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-lg relative">
            <h2 className="text-2xl font-bold mb-2">Edit Destination URL</h2>
            <p className="text-gray-400 text-sm mb-6">
              Change where <span className="text-purple-400 font-mono">bit.ly/{currentEditLink.shorturl}</span> redirects to. Your short link and QR code will remain exactly the same.
            </p>

            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">New Long URL</label>
                <input
                  type="url"
                  value={newUrlInput}
                  onChange={(e) => setNewUrlInput(e.target.value)}
                  required
                  placeholder="https://your-new-website.com"
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || newUrlInput === currentEditLink.url}
                  className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                >
                  {isUpdating ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saving...</>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;