"use client";
import React from "react";
import Link from "next/link";
// Import real auth hooks
import { useSession, signOut } from "next-auth/react"; 

const Navbar = () => {
  // This automatically checks if the user is logged in via cookies!
  const { data: session, status } = useSession(); 

  return (
    <nav className="h-16 bg-purple-700 flex justify-between px-3 items-center text-white">
      <div className="logo font-bold text-2xl">
        <Link href="/">BitLinks</Link>
      </div>
      
      <ul className="flex justify-center gap-4 items-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/shorten">Shorten</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
        
        <li className="flex gap-3">
          {/* If still loading the user state, show nothing to prevent flickering */}
          {status === "loading" ? null : session ? (
            // REAL LOGGED IN STATE
            <>
              <Link 
                href="/dashboard" 
                className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-purple-600 transition"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} // Safely log out and go home
                className="bg-red-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // REAL LOGGED OUT STATE
            <>
              <Link 
                href="/shorten" 
                className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-purple-600 transition"
              >
                Try Now
              </Link>
              <Link 
                href="/api/auth/signin" // NextAuth's built-in login page
                className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold hover:bg-purple-600 transition"
              >
                Login
              </Link>
              <Link 
                href="/signup" // You will need to build this custom signup page!
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