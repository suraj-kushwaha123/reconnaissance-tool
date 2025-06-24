'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-blue-500">OSINT Recon Tool</div>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="#features" className="hover:text-blue-400">Features</Link>
            <Link href="#about" className="hover:text-blue-400">About</Link>
            <Link href="#contact" className="hover:text-blue-400">Contact</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-2">
          <Link href="/" className="block hover:text-blue-400">Home</Link>
          <Link href="#features" className="block hover:text-blue-400">Features</Link>
          <Link href="#about" className="block hover:text-blue-400">About</Link>
          <Link href="#contact" className="block hover:text-blue-400">Contact</Link>
        </div>
      )}
    </nav>
  );
}
