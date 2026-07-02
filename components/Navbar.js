"use client";
import React, { useState } from "react";
import Link from "next/link";
// Import real auth hooks
import { useSession, signOut } from "next-auth/react"; 

const Navbar = () => {
  // This automatically checks if the user is logged in via cookies!
  const { data: session, status } = useSession(); 
  
  // State to manage the mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to close the menu when a link is clicked on mobile
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-purple-700 text-white relative z-50 shadow-md">
      <div className="h-16 flex justify-between px-4 sm:px-6 items-center max-w-7xl mx-auto w-full">
        <div className="logo font-bold text-2xl">
          <Link href="/" onClick={closeMenu}>BitLinks</Link>
        </div>
        
        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="md:hidden p-2 focus:outline-none text-white hover:bg-purple-600 rounded-lg transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              // X icon when open
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon when closed
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu (Hidden on mobile, visible on md and up) */}
        <ul className="hidden md:flex justify-center gap-6 items-center">
          <li><Link href="/" className="hover:text-purple-200 transition">Home</Link></li>
          <li><Link href="/about" className="hover:text-purple-200 transition">About</Link></li>
          <li><Link href="/shorten" className="hover:text-purple-200 transition">Shorten</Link></li>
          <li><Link href="/contact" className="hover:text-purple-200 transition">Contact Us</Link></li>
          
          <li className="flex gap-3 ml-2">
            {/* If still loading the user state, show nothing to prevent flickering */}
            {status === "loading" ? null : session ? (
              // REAL LOGGED IN STATE
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-purple-500 rounded-lg shadow-lg px-4 py-1.5 font-bold hover:bg-purple-600 transition"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="bg-red-500 rounded-lg shadow-lg px-4 py-1.5 font-bold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              // REAL LOGGED OUT STATE
              <>
                <Link 
                  href="/shorten" 
                  className="bg-purple-500 rounded-lg shadow-lg px-4 py-1.5 font-bold hover:bg-purple-600 transition"
                >
                  Try Now
                </Link>
                <Link 
                  href="/login" 
                  className="bg-purple-500 rounded-lg shadow-lg px-4 py-1.5 font-bold hover:bg-purple-600 transition"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-pink-500 rounded-lg shadow-lg px-4 py-1.5 font-bold hover:bg-pink-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Menu Dropdown (Visible only when isMobileMenuOpen is true on small screens) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-purple-800 border-t border-purple-600 shadow-xl flex flex-col py-4 px-6 gap-2 animate-in slide-in-from-top-2 duration-200">
          <Link href="/" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>Home</Link>
          <Link href="/about" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>About</Link>
          <Link href="/shorten" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>Shorten</Link>
          <Link href="/contact" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>Contact Us</Link>
          
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-purple-600">
            {status === "loading" ? null : session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-purple-500 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-purple-600 transition w-full"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { closeMenu(); signOut({ callbackUrl: '/' }); }} 
                  className="bg-red-500 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-red-600 transition w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/shorten" 
                  className="bg-purple-500 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-purple-600 transition w-full"
                  onClick={closeMenu}
                >
                  Try Now
                </Link>
                <Link 
                  href="/login" 
                  className="bg-purple-500 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-purple-600 transition w-full"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-pink-500 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-pink-600 transition w-full"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;