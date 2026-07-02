"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// The independent Counter component for the stats section
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
  // Typing Effect for the hero badge
  const text = "The Best URL Shortener in the Market";
  const [displayedText, setDisplayedText] = useState("");
  
  // Dynamic Authentication State (Toggle this to true/false to test)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Floating Background Shapes */}
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center px-6 py-20 gap-12 relative z-10">
        {/* Left Side (Text & CTA) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            {displayedText}<span className="animate-pulse text-pink-500">|</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Shrink the Link. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Expand your Impact.
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Ugly, massive URLs look spammy and ruin your brand. BitLinks transforms any long web address into a sleek, trackable powerhouse in milliseconds.
          </p>

          {/* Dynamic Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-lg flex items-center justify-center gap-2">
                  Go to Dashboard 📊
                </Link>
                <a href="#developers" className="px-8 py-4 rounded-xl font-bold bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-lg flex items-center justify-center">
                  Read the Docs
                </a>
              </>
            ) : (
              <>
                <Link href="/shorten" className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-lg flex items-center justify-center gap-2">
                  Try BitLinks Now 🚀
                </Link>
                <a href="#developers" className="px-8 py-4 rounded-xl font-bold bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-lg flex items-center justify-center">
                  API & Docs
                </a>
              </>
            )}
          </div>
        </motion.div>

        {/* Right Side (Image) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[400px] w-full"
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
      <section className="relative z-10 py-16 bg-white/5 backdrop-blur-md border-y border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400">
              <Counter end={12000} />+
            </h2>
            <p className="text-gray-300 mt-2 font-medium tracking-wide">Links Created</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-pink-400">
              <Counter end={8000} />+
            </h2>
            <p className="text-gray-300 mt-2 font-medium tracking-wide">Happy Users</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400">
              <Counter end={99} />%
            </h2>
            <p className="text-gray-300 mt-2 font-medium tracking-wide">Uptime Reliability</p>
          </div>
        </motion.div>
      </section>

      {/* The Problem / Solution Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why the world uses BitLinks
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-purple-500/30">🔗</div>
              <h3 className="text-xl font-bold mb-3">Clean Up the Clutter</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nobody wants to click a link with 150 random characters. Create short, memorable links that build trust and look perfectly clean on social media, emails, and SMS.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-pink-500/30">📊</div>
              <h3 className="text-xl font-bold mb-3">Real-Time Analytics</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stop guessing. See exactly who clicked your link, what country they are from, and what device they used. Data is power, and we give it all to you.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-orange-500/30">✏️</div>
              <h3 className="text-xl font-bold mb-3">Custom Aliases</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Don't settle for random letters. Claim custom slugs like <code>bit.links/summer-sale</code> to make your URLs instantly recognizable and on-brand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two Audiences Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl font-bold">For Creators & Marketers</h2>
            <p className="text-gray-400 text-lg">
              Whether you are sharing a new YouTube video, running an Instagram ad campaign, or sending out a newsletter, BitLinks ensures your audience isn't scared away by messy links.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-pink-500">✔</span> Maximize click-through rates
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-pink-500">✔</span> Track engagement across platforms
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-pink-500">✔</span> QR code generation built-in
              </li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} id="developers" className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 bg-purple-500 text-xs font-bold px-3 py-1 rounded-bl-lg">DEV MODE</div>
            <h2 className="text-3xl font-bold mb-4 font-mono">For Developers</h2>
            <p className="text-gray-400 mb-6">
              Integrate BitLinks directly into your own applications using our lightning-fast REST API.
            </p>
            <div className="bg-black p-4 rounded-xl font-mono text-sm text-green-400 overflow-x-auto border border-white/5">
              <code>
                <span className="text-purple-400">await</span> fetch("https://api.bitlinks.app/v1/shorten", {"{"} <br/>
                &nbsp;&nbsp;method: <span className="text-yellow-300">"POST"</span>, <br/>
                &nbsp;&nbsp;body: JSON.stringify({"{"} <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;url: <span className="text-yellow-300">"https://verylong.com/..."</span> <br/>
                &nbsp;&nbsp;{"}"}) <br/>
                {"}"});
              </code>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Why Create an Account (The "Addictive" Hook) */}
      <section className="py-24 bg-gradient-to-b from-transparent to-purple-900/20">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why create an account?</h2>
          <p className="text-gray-300 mb-12 text-lg">
            Sure, you can shorten links anywhere. But when you log into BitLinks, you unlock your own personal command center. Stop renting your audience and start owning your data.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
              <strong className="block text-white mb-1">Link History</strong>
              <span className="text-sm text-gray-400">Never lose a link again. Every URL you shorten is saved forever in your secure dashboard.</span>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
              <strong className="block text-white mb-1">Edit Destination</strong>
              <span className="text-sm text-gray-400">Made a typo? No problem. Change where your short link points to at any time without breaking the original URL.</span>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors">
              <strong className="block text-white mb-1">Live Click Counters</strong>
              <span className="text-sm text-gray-400">Watch the numbers go up in real-time as your audience engages with your content.</span>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors">
              <strong className="block text-white mb-1">It's 100% Free</strong>
              <span className="text-sm text-gray-400">Log in with one click using GitHub or Google, and get started instantly at zero cost.</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <footer className="py-24 text-center border-t border-white/10 bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to take control of your links?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Join thousands of creators, marketers, and developers building a better web with BitLinks.
          </p>
          <Link href="/signup" className="px-10 py-5 rounded-2xl font-bold bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-block">
            Create Your Free Account
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            Already have an account? <Link href="/login" className="text-purple-400 hover:underline">Log in here</Link>.
          </p>
        </motion.div>
      </footer>

    </div>
  );
}