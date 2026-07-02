"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return <span>{count}</span>;
};

export default function Home() {
  const text = "The Best URL Shortener in the Market";
  const [displayedText, setDisplayedText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In production, replace with real auth state

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Background Shapes - Hidden on very small screens to avoid overflow */}
      <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-0 sm:left-10 animate-pulse pointer-events-none"></div>
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-3xl bottom-10 right-0 sm:right-10 animate-pulse pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center px-6 py-16 sm:py-20 gap-8 sm:gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 items-center text-center md:items-start md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-purple-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            {displayedText}<span className="animate-pulse text-pink-500">|</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Shrink the Link. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Expand your Impact.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            Ugly URLs look spammy and ruin your brand. BitLinks transforms any long web address into a sleek, trackable powerhouse—complete with downloadable QR codes—in milliseconds.
          </p>

          <div className="flex flex-col w-full sm:flex-row gap-4 mt-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center">
                  Go to Dashboard 📊
                </Link>
                <a href="#developers" className="px-8 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all text-center flex items-center justify-center">
                  Read the Docs
                </a>
              </>
            ) : (
              <>
                <Link href="/shorten" className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center">
                  Try Shortener Now 🚀
                </Link>
                {/* Updated QR Code Hook Button */}
                <Link href="/login" className="px-8 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all text-center flex flex-col items-center justify-center border border-white/5">
                  <span>Unlock QR Codes 📱</span>
                  <span className="text-xs font-normal text-purple-300 mt-1">(Requires Account)</span>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[300px] sm:h-[400px] w-full"
        >
          <Image
            src="/vector.jpg"
            alt="Vector Illustration"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 sm:py-16 bg-white/5 backdrop-blur-md border-y border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-center px-6"
        >
          {[{end: 12000, label: "Links Created", color: "text-purple-400"}, {end: 8000, label: "Happy Users", color: "text-pink-400"}, {end: 99, label: "Uptime Reliability", color: "text-purple-400"}].map((stat, i) => (
            <div key={i}>
              <h2 className={`text-3xl sm:text-5xl font-bold ${stat.color}`}>
                <Counter end={stat.end} />{stat.end === 99 ? "%" : "+"}
              </h2>
              <p className="text-gray-300 mt-2 text-sm sm:text-base font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section (Expanded to 4 columns for QR) */}
      <section className="py-16 sm:py-24 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why the world uses BitLinks</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {title: "Clean Up", icon: "🔗", desc: "Short, memorable links that build trust."}, 
              {title: "Real-Time", icon: "📊", desc: "See exactly who clicked your link."}, 
              {title: "Custom", icon: "✏️", desc: "Claim slugs like bit.links/brand."},
              {title: "Free QR Codes", icon: "📱", desc: "Instantly generate scannable QR codes."}
            ].map((f, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 mb-6 flex items-center justify-center text-2xl bg-white/10 rounded-2xl">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Hook: Why Create an Account (Benefits, Security, QR) */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-transparent to-purple-900/20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Unlock Your Secure Command Center</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Anyone can shrink a link instantly without logging in. But when you create a 100% free account, you unlock powerful tools to own, track, and protect your digital presence.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Free QR Code Generation */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📱</div>
              <strong className="block text-xl text-white mb-2">QR Codes (Free for Users)</strong>
              <span className="text-base text-gray-400 leading-relaxed block">
                Take your links to the physical world. Generate, customize, and download high-quality PNG QR codes for any link. <em>(Requires login to prevent spam abuse).</em>
              </span>
            </motion.div>

            {/* Security & Privacy */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
              <strong className="block text-xl text-white mb-2">Ironclad Privacy & Security</strong>
              <span className="text-base text-gray-400 leading-relaxed block">
                Your data is yours. We utilize bank-grade hashing for passwords, secure OAuth protocols (Google/GitHub), and strict data encryption to keep your account safe.
              </span>
            </motion.div>

            {/* Link Management */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📂</div>
              <strong className="block text-xl text-white mb-2">Permanent Link History</strong>
              <span className="text-base text-gray-400 leading-relaxed block">
                Never lose a link again. Every URL you create is securely saved to your personal dashboard where you can easily copy, share, or edit them anytime.
              </span>
            </motion.div>

            {/* Analytics */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📈</div>
              <strong className="block text-xl text-white mb-2">Live Click Analytics</strong>
              <span className="text-base text-gray-400 leading-relaxed block">
                Watch the numbers go up in real-time. Track total engagement instantly to see how well your marketing campaigns or social posts are performing.
              </span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="py-16 sm:py-24 text-center px-6 border-t border-white/10 bg-black/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to take control?</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">Join thousands of creators, developers, and brands building a better web.</p>
          <Link href="/login" className="px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold bg-white text-black hover:scale-105 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-block">
            Unlock QR Codes Now
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            Don't have an account? <Link href="/signup" className="text-purple-400 hover:underline">Sign up here</Link>.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}