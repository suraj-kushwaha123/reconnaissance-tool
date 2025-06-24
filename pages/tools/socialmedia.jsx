// File: pages/tools/socialmedia.jsx

import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

const SocialMediaLookup = dynamic(() => import('@/components/SocialMediaLookup'), {
  ssr: false,
});

export default function SocialMediaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 px-6 pb-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-300">🔍 Social Media Lookup</h1>
        <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-xl">
          <SocialMediaLookup />
        </div>
      </main>
    </>
  );
}
