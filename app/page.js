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
  
  // Local state to toggle language examples in the developer documentation mock
  const [apiTab, setApiTab] = useState("js");

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

      {/* --- NEW SECTION: DEVELOPER API DOCUMENTATION PREVIEW --- */}
      <section id="developers" className="py-20 sm:py-24 px-6 border-t border-white/5 bg-slate-950/30 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: API Features & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 tracking-wide uppercase">
              Developer Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Shorten Links at Scale with our REST API
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              Automate your workflows by embedding BitLinks shortening architecture directly into your external software applications, custom landing pages, or automated scripts.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">🔑</div>
                <div>
                  <h4 className="font-bold text-white text-base">Simple Token Authentication</h4>
                  <p className="text-gray-400 text-sm mt-0.5">Access your personal, secure API key seamlessly right from your Account Settings Profile tab.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">⚡</div>
                <div>
                  <h4 className="font-bold text-white text-base">Ultra-Low Latency & High Limits</h4>
                  <p className="text-gray-400 text-sm mt-0.5">Built on MongoDB and high-speed cloud clusters to yield lightning-quick payload responses at scale.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">💯</div>
                <div>
                  <h4 className="font-bold text-white text-base">100% Fully Free Ecosystem</h4>
                  <p className="text-gray-400 text-sm mt-0.5">No hidden microtransactions or locked enterprise barriers. Complete control over endpoints at zero cost.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Code Terminal Sandbox Component */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="lg:col-span-7 bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Terminal Top Window Controls bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500 font-mono ml-2">api-request-snippet.js</span>
              </div>
              
              {/* Tab Selector Buttons */}
              <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
                <button 
                  onClick={() => setApiTab("js")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${apiTab === "js" ? "bg-purple-600 text-white shadow-sm" : "text-gray-400 hover:text-white"}`}
                >
                  JavaScript
                </button>
                <button 
                  onClick={() => setApiTab("curl")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${apiTab === "curl" ? "bg-purple-600 text-white shadow-sm" : "text-gray-400 hover:text-white"}`}
                >
                  cURL
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto bg-slate-950/50 leading-relaxed text-slate-300">
              {apiTab === "js" ? (
                <pre>
                  <code>
                    <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-yellow-300">"https://bitlinks.app/api/links"</span>, &#123;<br />
                    &nbsp;&nbsp;method: <span className="text-yellow-300">"POST"</span>,<br />
                    &nbsp;&nbsp;headers: &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"Content-Type"</span>: <span className="text-yellow-300">"application/json"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">"Authorization"</span>: <span className="text-yellow-300">"Bearer bl_live_your_key"</span><br />
                    &nbsp;&nbsp;&#125;,<br />
                    &nbsp;&nbsp;body: JSON.<span className="text-blue-400">stringify</span>(&#123; url: <span className="text-yellow-300">"https://massive-destination.com"</span> &#125;)<br />
                    &#125;);<br /><br />
                    <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> response.<span className="text-blue-400">json</span>();<br />
                    console.<span className="text-blue-400">log</span>(data.<span className="text-emerald-400">shorturl</span>); <span className="text-gray-500">// Returns generated 6-char anchor slug</span>
                  </code>
                </pre>
              ) : (
                <pre>
                  <code>
                    <span className="text-purple-400">curl</span> -X POST https://bitlinks.app/api/links \<br />
                    &nbsp;&nbsp;-H <span className="text-yellow-300">"Content-Type: application/json"</span> \<br />
                    &nbsp;&nbsp;-H <span className="text-yellow-300">"Authorization: Bearer bl_live_your_key"</span> \<br />
                    &nbsp;&nbsp;-d <span className="text-yellow-300">'&#123;"url": "https://massive-destination.com"&#125;'</span>
                  </code>
                </pre>
              )}
            </div>
          </motion.div>

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