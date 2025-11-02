"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 h-[72px]">
        {/* LEFT: Logo + Tagline */}
        <div className="flex items-center space-x-1">
          <Image
            src="/LandingPage/newLogo.png"
            alt="AK Motors Logo"
            width={180}
            height={60}
            className="object-contain"
          />

          <div className="h-10 w-px bg-gray-300 mx-2" />

          <div className="leading-snug text-sm text-black hidden sm:block">
            <div className="font-bold text-[18px]">How we move you.</div>
            <div className="text-xs text-gray-900">REPAIR ▸ REBUILD, RIDE</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex space-x-25 text-sm font-medium text-black">
          <li>
            <Link href="/" className="hover:text-blue-500">
              Automobiles
            </Link>
          </li>
          {/* <li>
            <Link href="/dealer-network" className="hover:text-blue-500">
              Dealer Network
            </Link>
          </li> */}
          <li>
            <Link href="#services" className="hover:text-blue-500">
              Services
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-blue-500">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/sign-in" className="hover:text-blue-500">
              Sign-In
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-black"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 pb-4">
          <ul className="flex flex-col items-center space-y-5 text-sm font-medium text-black">
            <li>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                Automobiles
              </Link>
            </li>
            {/* <li>
              <Link
                href="/dealer-network"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dealer Network
              </Link>
            </li> */}
            <li>
              <Link href="#services" onClick={() => setMobileMenuOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                Sign-In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
