"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  // Fake authentication state (Change this to 'true' to see the UI change!)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="h-16 bg-purple-700 flex justify-between px-3 items-center text-white">
      <div className="logo font-bold text-2xl">
        <Link href="/">BitLinks</Link>
      </div>
      
      <ul className="flex justify-center gap-4 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/shorten">Shorten</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
        
        {/* Dynamic Auth Buttons */}
        <li className="flex gap-3">
          {isLoggedIn ? (
            // WHAT USERS SEE WHEN LOGGED IN
            <>
              <Link 
                href="/dashboard" 
                className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-purple-600 transition"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // WHAT USERS SEE WHEN LOGGED OUT
            <>
              <Link 
                href="/shorten" 
                className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-purple-600 transition"
              >
                Try Now
              </Link>
              <Link 
                href="/login" 
                className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-purple-600 transition"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-pink-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-pink-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;