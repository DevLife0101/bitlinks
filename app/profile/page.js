"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Form states for later backend integration
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [apiKey, setApiKey] = useState("bl_live_xxxxxxxxxxxxxxxxxxxx");

  // Route Guard
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle password form submission (UI only for now)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      alert("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
      setIsUpdating(false);
    }, 1000);
  };

  // Generate a fake API key for visual purposes
  const handleGenerateKey = () => {
    const newKey = "bl_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    alert("New API Key generated! 🚀");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your identity, security, and developer preferences.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* --- 1. IDENTITY CARD --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
              {session.user?.image ? (
                <Image 
                  src={session.user?.image} 
                  alt="Profile Photo" 
                  fill
                  className="rounded-full border-4 border-purple-500/50 object-cover shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-4xl sm:text-5xl font-bold border-4 border-purple-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold">{session.user?.name}</h2>
              <p className="text-gray-400 text-lg">{session.user?.email}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-sm text-green-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Active Pro Plan
              </div>
            </div>
          </motion.div>

          {/* --- 2. DEVELOPER API SECTION --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">👨‍💻</div>
              <h2 className="text-xl font-bold">Developer API</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Use this key to authenticate with the BitLinks REST API. Keep it secret!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                readOnly 
                value={apiKey} 
                className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-300 font-mono text-sm focus:outline-none"
              />
              <button 
                onClick={handleGenerateKey}
                className="px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm whitespace-nowrap"
              >
                Regenerate Key
              </button>
            </div>
          </motion.div>

          {/* --- 3. SECURITY & PASSWORD --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400">🔒</div>
              <h2 className="text-xl font-bold">Security</h2>
            </div>
            
            {/* Disclaimer for OAuth Users */}
            {session.user?.image && (
              <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3 text-sm text-blue-200">
                <span className="text-lg">ℹ️</span>
                <p>Because you log in using Google or GitHub, you do not have a standard password. If you ever need to change how you log in, please manage your security settings directly through your Google or GitHub account.</p>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div className="md:col-span-2 mt-2">
                <button 
                  type="submit"
                  disabled={isUpdating || !passwords.current || !passwords.new}
                  className="px-6 py-3 rounded-xl font-semibold bg-purple-500 hover:bg-purple-600 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isUpdating ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* --- 4. DANGER ZONE --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-xl text-red-400">⚠️</div>
              <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Permanently delete your account and all associated short links. This action cannot be undone, and your QR codes will instantly break.
            </p>

            {!showDeleteConfirm ? (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 rounded-xl font-bold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all"
              >
                Delete Account
              </button>
            ) : (
              <div className="bg-red-950/50 p-4 rounded-xl border border-red-500/30 flex flex-col sm:flex-row items-center gap-4 justify-between animate-in fade-in">
                <span className="text-sm text-red-200 font-medium">Are you absolutely sure?</span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-semibold bg-white/10 hover:bg-white/20 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => { alert("Backend route needed!"); signOut({ callbackUrl: '/' }); }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold bg-red-500 text-white hover:bg-red-600 transition-all text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  >
                    Yes, Delete Everything
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Profile;