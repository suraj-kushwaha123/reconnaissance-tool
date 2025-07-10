import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ShieldCheck, Globe, Fingerprint, LocateIcon, Lock, Server,
  Mail, Image as LucideImage, UserSearch, Network, Moon, Code, 
  Database, Shield, BarChart, Zap, Eye, Key, Cloud, Bell
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
  { name: 'Reverse Image Search', route: '/tools/reverse-image', icon: <LucideImage /> },
  { name: 'Dark Web Scan', route: '/tools/dark-web', icon: <Moon /> },
  { name: 'API Integrations', route: '/tools/api-integrations', icon: <Code /> },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // AI Assistant animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(v => !v);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <main className={`relative min-h-screen font-sans overflow-x-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'}`}>
        {/* AI Assistant */}
        <motion.div 
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-3 rounded-full shadow-xl">
            <div className="bg-white/20 p-2 rounded-full">
              <Zap size={20} />
            </div>
            <span>AI Assistant</span>
          </div>
        </motion.div>
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-24 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-2 rounded-full shadow-lg"
        >
          {darkMode ? <Eye size={20} /> : <Moon size={20} />}
        </button>

        {/* Background Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-full ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'}`}></div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-[length:50px_50px] opacity-10"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-10 left-1/4 w-4 h-4 rounded-full bg-cyan-400 blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-violet-500 blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-indigo-500 blur-xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto pt-28 pb-20 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  OSINT <span className="block mt-2">Recon Toolkit</span>
                </h1>
                <p className="mt-6 text-lg text-blue-100 max-w-xl">
                  Next-generation OSINT platform for cybersecurity professionals. AI-powered reconnaissance with real-time threat intelligence and automated workflows.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => scrollToSection('tools')}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Tools
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection('features')}
                    className="px-8 py-3.5 rounded-xl border border-blue-500/40 text-white font-semibold backdrop-blur-sm bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Discover Features
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30"></div>
                  
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full aspect-video border-2 border-blue-600/30 bg-gradient-to-br from-blue-800 to-indigo-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gradient-to-br from-cyan-600/20 to-blue-700/30 backdrop-blur-sm border border-white/10 rounded-xl w-full h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-4">
                            <Shield size={40} className="text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">AI-Powered Threat Intelligence</h3>
                          <p className="mt-2 text-blue-100">Real-time analysis and predictive insights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "12+", label: "Advanced Tools" },
                { value: "24/7", label: "Real-time Monitoring" },
                { value: "99.9%", label: "Platform Uptime" },
                { value: "AI", label: "Powered Intelligence" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="mt-1 text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tools Section */}
          <section id="tools" className="max-w-6xl mx-auto py-20 px-6">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Advanced OSINT Tools
              </motion.h2>
              <motion.p 
                className="mt-4 max-w-2xl mx-auto text-blue-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Next-generation reconnaissance tools powered by AI and machine learning for deeper insights.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    href={tool.route}
                    className="group rounded-2xl p-6 shadow-xl backdrop-blur-md bg-white/5 border border-white/10 
                      hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-600/10 hover:border-cyan-400/30
                      transition-all duration-300 flex flex-col gap-4 h-full"
                  >
                    <div className="text-cyan-400 group-hover:text-white transition-colors text-3xl">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm text-blue-100 group-hover:text-white transition-colors">
                        AI-enhanced analysis and insights
                      </p>
                    </div>
                    <div className="mt-auto pt-4">
                      <div className="inline-flex items-center text-sm text-cyan-300 group-hover:text-white transition-colors">
                        Access Tool
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-gradient-to-b from-blue-900/20 to-indigo-900/30">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Core Features
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-blue-100">
                  Essential capabilities for cybersecurity investigations
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Advanced Analytics",
                    desc: "Visualize and analyze data with powerful dashboards and reporting tools",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  },
                  {
                    title: "Real-time Results",
                    desc: "Get instant insights with our optimized scanning and query engines",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  },
                  {
                    title: "Secure & Private",
                    desc: "Your queries and results remain confidential with end-to-end encryption",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <div className="text-cyan-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-blue-100">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="max-w-4xl mx-auto py-20 px-6">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                About This Project
              </h2>
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
                <p className="text-blue-100 leading-relaxed mb-6 text-lg">
                  The OSINT Recon Toolkit is built on a modern tech stack including Next.js, Tailwind CSS, and React. Designed with both aesthetics and security in mind, it provides powerful capabilities for cybersecurity professionals.
                </p>
                <p className="text-blue-100 leading-relaxed mb-6 text-lg">
                  Our mission is to make sophisticated reconnaissance capabilities accessible to security teams of all sizes without compromising on privacy or security.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Technology", desc: "Next.js, Tailwind, React", icon: <Code /> },
                    { title: "Security", desc: "End-to-end encryption", icon: <Shield /> },
                    { title: "Deployment", desc: "Cloud-native architecture", icon: <Cloud /> }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-blue-900/20 rounded-xl border border-blue-700/30 flex items-center gap-3">
                      <div className="text-cyan-400">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-cyan-400">{item.title}</h3>
                        <p className="text-blue-100">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Ready to Transform Your Security Operations?
              </motion.h2>
              <motion.p 
                className="text-xl text-blue-100 max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Join thousands of security professionals using our platform
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => scrollToSection('tools')}
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started Now
                </button>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="max-w-4xl mx-auto py-20 px-6">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Contact Us
              </h2>
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Get in Touch</h3>
                    <p className="text-blue-100 mb-6">
                      Have questions about our platform or need support? Our team is ready to assist you.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="text-cyan-400 mt-1" />
                        <div>
                          <div className="text-blue-100">Email</div>
                          <a href="mailto:support@osint-toolkit.com" className="text-white hover:text-cyan-300 transition-colors">support@osint-toolkit.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="text-cyan-400 mt-1" />
                        <div>
                          <div className="text-blue-100">Documentation</div>
                          <a href="#" className="text-white hover:text-cyan-300 transition-colors">docs.osint-toolkit.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700/30">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Send a Message</h3>
                    <form className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          className="w-full bg-blue-900/30 border border-blue-700/50 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          className="w-full bg-blue-900/30 border border-blue-700/50 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="Your Message" 
                          rows="4"
                          className="w-full bg-blue-900/30 border border-blue-700/50 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium hover:from-cyan-500 hover:to-blue-600 transition-all"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 py-12 text-center">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div className="text-2xl font-bold text-cyan-300">OSINT Recon Toolkit</div>
                <div className="flex gap-6">
                  <a href="#" className="text-blue-100 hover:text-cyan-300 transition-colors">Privacy</a>
                  <a href="#" className="text-blue-100 hover:text-cyan-300 transition-colors">Terms</a>
                  <a href="#contact" className="text-blue-100 hover:text-cyan-300 transition-colors">Contact</a>
                  <a href="#about" className="text-blue-100 hover:text-cyan-300 transition-colors">About</a>
                </div>
              </div>
              <p className="text-blue-100 text-sm mt-4">&copy; 2025 OSINT Recon Toolkit - Advanced Threat Intelligence Platform</p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}