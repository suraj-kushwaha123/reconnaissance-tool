// pages/tools/asn.jsx
import Navbar from '@/components/Navbar';
import ASNLookup from '@/components/ASNLookup';

export default function ASNPage() {
  return (
    <>
      <Navbar />
      <main className="mt-20 bg-gray-100 text-gray-900 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">📡 ASN Lookup Tool</h1>
        <div className="max-w-2xl mx-auto">
          <ASNLookup />
        </div>
      </main>
    </>
  );
}
