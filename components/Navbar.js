import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 bg-purple-700 flex justify-between px-3 items-center text-white">
      <div className="logo font-bold text-2xl">
        <Link href="/">BitLinks</Link>
      </div>
      
      <ul className="flex justify-center gap-4 items-center">
        {/* 1. Fixed: <li> is now the direct child of <ul> */}
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
        
        {/* 2. Fixed: Removed <button> and applied classes directly to <Link> */}
        <li className="flex gap-3">
          <Link 
            href="/shorten" 
            className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold"
          >
            Try Now
          </Link>
          <Link 
            href="/github" 
            className="bg-purple-500 rounded-lg shadow-lg px-3 py-1 font-bold"
          >
            GitHub
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;