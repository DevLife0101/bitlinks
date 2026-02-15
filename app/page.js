"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {

  // Typing Effect
  const text = "The Best URL Shortener in the Market";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Counter Animation
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white">

      {/* Floating Background Shapes */}
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center px-6 py-24 gap-12 relative z-10">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            Simple. Secure. Private. Create powerful short links instantly
            without login or tracking.
          </p>

          <div className="flex gap-4 mt-4">
            <Link href="/shorten">
              <button className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300">
                Try Now 🚀
              </button>
            </Link>

            <Link href="/github">
              <button className="px-6 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/10 transition-all duration-300">
                GitHub
              </button>
            </Link>
          </div>

        </motion.div>

        {/* Right Image */}
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
      <section className="relative z-10 py-20 bg-white/5 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center"
        >

          <div>
            <h2 className="text-4xl font-bold text-purple-400">
              <Counter end={12000} />+
            </h2>
            <p className="text-gray-300 mt-2">Links Created</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-pink-400">
              <Counter end={8000} />+
            </h2>
            <p className="text-gray-300 mt-2">Happy Users</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-purple-400">
              <Counter end={99} />%
            </h2>
            <p className="text-gray-300 mt-2">Uptime</p>
          </div>

        </motion.div>
      </section>

    </div>
  );
}
