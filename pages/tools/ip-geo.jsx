// pages/tools/ip-geo.jsx
import Navbar from '@/components/Navbar';
import IPGeoLookup from '@/components/IPGeoLookup';

export default function IPGeoLookupPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 bg-gray-100 text-gray-900 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">🌍 IP Geolocation</h1>
        <div className="max-w-2xl mx-auto">
          <IPGeoLookup />
        </div>
      </main>
    </>
  );
}