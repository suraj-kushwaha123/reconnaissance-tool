import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Globe, Fingerprint, LocateIcon, Lock, Server,
  Mail, Image, UserSearch, Network
} from 'lucide-react';

const tools = [
  { name: 'Domain Recon', route: '/tools/domain-recon', icon: <Globe /> },
  { name: 'Subdomain Scan', route: '/tools/subdomain-scan', icon: <Network /> },
  { name: 'Reverse IP Lookup', route: '/tools/reverse-ip', icon: <Fingerprint /> },
  { name: 'HTTP Headers', route: '/tools/http-headers', icon: <Server /> },
  { name: 'SSL Certificate', route: '/tools/ssl-certificate', icon: <Lock /> },
  { name: 'IP Geolocation', route: '/tools/ip-geo', icon: <LocateIcon /> },
  { name: 'ASN Lookup', route: '/tools/asn-lookup', icon: <ShieldCheck /> },
  { name: 'Email Breach Check', route: '/tools/email-breach', icon: <Mail /> },
  { name: 'Social Media Lookup', route: '/tools/socialmedia', icon: <UserSearch /> },
  { name: 'Reverse Image Search', route: '/tools/reverse-image', icon: <Image /> },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen text-white font-sans px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-croptrust.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#265077]/80 to-[#022140]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto pt-28 pb-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-5xl font-extrabold text-white leading-tight">
                OSINT Recon Toolkit
              </h1>
              <p className="mt-6 text-lg text-[#99CED3]">
                Built for cybersecurity specialists and ethical hackers. Discover a new visual and efficient recon experience.
              </p>
              <div className="mt-8">
                <a
                  href="#tools"
                  className="bg-[#2D5F5D] hover:bg-[#1E4258] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                >
                  Explore Tools
                </a>
              </div>
            </div>

            <div className="md:w-1/2">
              <img
                src="/images/hero-image.jpg"
                alt="OSINT Toolkit Visual"
                className="rounded-xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </section>

          {/* Tools Section */}
          <section id="tools" className="max-w-6xl mx-auto py-20">
            <h2 className="text-3xl font-bold text-center text-[#EDB5BF] mb-12">All Tools</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {tools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                >
                  <Link
                    href={tool.route}
                    className="group rounded-2xl p-6 shadow-xl border border-[#2D5F5D] bg-[#265077]/10 backdrop-blur-md 
                      hover:bg-[#1E4258]/30 hover:shadow-[#2D5F5D]/40 transition duration-300 ease-in-out
                      flex items-start gap-5"
                  >
                    <div className="text-[#2D5F5D] group-hover:text-[#99CED3] transition duration-200 text-2xl">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#99CED3]">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-200 group-hover:text-[#99CED3]/90 transition">
                        Click to launch
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="max-w-4xl mx-auto py-20 text-center">
            <h2 className="text-3xl font-bold text-[#2D5F5D] mb-6">About This Project</h2>
            <p className="text-slate-200 leading-relaxed">
              This OSINT toolkit is built using Next.js and Tailwind CSS. Designed with aesthetics and security in mind,
              it's a reliable asset for digital reconnaissance and cybersecurity learning.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="max-w-3xl mx-auto text-center mt-20 text-slate-300 text-sm px-4">
            <p className="bg-white/10 border border-white/10 backdrop-blur-md p-4 rounded-lg shadow-sm">
              ⚠️ <span className="font-semibold text-[#2D5F5D]">Note:</span> Some tools may not work due to API cost or rate limits.
              This is a <span className="text-[#99CED3]">demo project</span> built for portfolio and educational purposes.
            </p>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 py-12 text-center mt-20">
            <h3 className="text-xl font-bold text-[#2D5F5D] mb-2">Contact</h3>
            <p className="text-slate-300">
              Questions or contributions? Reach out at <span className="text-[#86B3D1]">osint@yourdomain.com</span>
            </p>
            <p className="text-slate-400 text-sm mt-4">&copy; 2025 OSINT Recon Toolkit</p>
          </footer>
        </div>
      </main>
    </>
  );
}