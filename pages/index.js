// File: pages/index.js – Fully Styled with Working Feature Links

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tools = [
  { name: 'Domain Recon', route: '/tools/domain-recon' },
  { name: 'Subdomain Scan', route: '/tools/subdomain-scan' },
  { name: 'Reverse IP Lookup', route: '/tools/reverse-ip' },
  { name: 'HTTP Headers', route: '/tools/http-headers' },
  { name: 'SSL Certificate', route: '/tools/ssl-certificate' },
  { name: 'IP Geolocation', route: '/tools/ip-geo' },
  { name: 'ASN Lookup', route: '/tools/asn-lookup' },
  { name: 'Email Breach Check', route: '/tools/email-breach' },
  { name: 'Social Media Lookup', route: '/tools/socialmedia' },
  { name: 'Reverse Image Search', route: '/tools/reverse-image' },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen pt-24 pb-16 px-6 text-white font-sans">
        <section className="text-center mb-12" id="hero">
          <h1 className="text-5xl font-extrabold text-cyan-300 drop-shadow-2xl tracking-wide mb-4 animate-fade-in">
            OSINT Recon Toolkit
          </h1>
          <p className="text-lg text-indigo-200 max-w-xl mx-auto animate-fade-in-delay">
            A modern suite of open-source intelligence tools to empower your reconnaissance workflow.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto" id="features">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={tool.route}
                className="group bg-gradient-to-tr from-emerald-700 via-green-800 to-teal-900 hover:from-teal-800 hover:to-emerald-900 border border-lime-400 rounded-xl p-6 shadow-xl hover:shadow-lime-500/40 transition-all duration-300 flex flex-col justify-center items-center text-center"
              >
                <span className="text-2xl font-bold text-lime-300 group-hover:text-white transition-colors duration-300 mb-2">
                  {tool.name}
                </span>
                <span className="text-sm text-green-200 group-hover:text-lime-200 transition-colors">
                  Explore & Use Tool
                </span>
              </Link>
            </motion.div>
          ))}
        </section>

        <section id="about" className="mt-24 text-center text-indigo-300">
          <h2 className="text-3xl font-bold mb-2">About</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This toolkit brings together powerful OSINT capabilities into a clean, accessible interface. Built using Next.js and TailwindCSS.
          </p>
        </section>

        <section id="contact" className="mt-16 text-center text-indigo-300">
          <h2 className="text-3xl font-bold mb-2">Contact</h2>
          <p className="text-gray-400">For feedback or contributions, contact us at osint@yourdomain.com</p>
        </section>
      </main>
    </>
  );
}