"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Import real auth hooks
import { useSession, signOut } from "next-auth/react"; 

const Navbar = () => {
  // This automatically checks if the user is logged in via cookies!
  const { data: session, status } = useSession(); 
  
  // State to manage the mobile menu and desktop dropdown toggles
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Helper function to close the menus when a link is clicked
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Close dropdown if user clicks outside of it on desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          
          <li className="flex gap-3 ml-2 items-center">
            {/* If still loading the user state, show a small spinner to prevent flickering */}
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
            ) : session ? (
              
              // --- REAL LOGGED IN STATE: PROFILE DROPDOWN ---
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="Profile" 
                      width={36} 
                      height={36} 
                      className="rounded-full border-2 border-purple-400 shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center font-bold border-2 border-purple-400 shadow-sm">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-white/10 mb-1">
                      <p className="text-sm font-bold truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    
                    <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2" onClick={closeMenu}>
                      📊 Dashboard
                    </Link>
                    <Link href="/profile" className="px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2" onClick={closeMenu}>
                      ⚙️ Account Settings
                    </Link>
                    
                    <button 
                      onClick={() => { closeMenu(); signOut({ callbackUrl: '/' }); }} 
                      className="px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors text-left flex items-center gap-2 w-full mt-1 border-t border-white/10 pt-2"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>

            ) : (
              // --- REAL LOGGED OUT STATE ---
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
          
          {/* Mobile Profile Header */}
          {session && (
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-purple-600">
               {session.user?.image ? (
                  <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full border-2 border-purple-400" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold text-lg border-2 border-purple-400">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="font-bold text-white truncate">{session.user?.name}</p>
                  <p className="text-xs text-purple-300 truncate">{session.user?.email}</p>
                </div>
            </div>
          )}

          <Link href="/" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>Home</Link>
          <Link href="/about" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>About</Link>
          <Link href="/shorten" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>Shorten</Link>
          <Link href="/contact" className="py-2 hover:bg-purple-700 rounded px-2 transition" onClick={closeMenu}>Contact Us</Link>
          
          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-purple-600">
            {status === "loading" ? null : session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="bg-purple-500 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-purple-600 transition w-full"
                  onClick={closeMenu}
                >
                  📊 Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  className="bg-purple-600 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-purple-500 transition w-full border border-purple-500"
                  onClick={closeMenu}
                >
                  ⚙️ Account Settings
                </Link>
                <button 
                  onClick={() => { closeMenu(); signOut({ callbackUrl: '/' }); }} 
                  className="bg-red-500/20 text-red-200 border border-red-500/50 text-center rounded-lg shadow-lg px-4 py-2.5 font-bold hover:bg-red-500 hover:text-white transition w-full mt-2"
                >
                  🚪 Logout
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