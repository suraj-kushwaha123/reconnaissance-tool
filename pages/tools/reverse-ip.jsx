
// pages/tools/reverse-ip.jsx
import Navbar from '@/components/Navbar';
import ReverseIPLookup from '@/components/ReverseIPLookup';

export default function ReverseIPLookupPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 bg-gray-100 text-gray-900 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">🔁 Reverse IP Lookup</h1>
        <div className="max-w-2xl mx-auto">
          <ReverseIPLookup />
        </div>
      </main>
    </>
  );
}
