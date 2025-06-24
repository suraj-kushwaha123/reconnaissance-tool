import Navbar from '@/components/Navbar';
import SubdomainScan from '@/components/SubdomainScan';

export default function SubdomainScanPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 bg-gray-100 text-gray-900 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">🌐 Subdomain Enumeration</h1>
        <div className="max-w-2xl mx-auto">
          <SubdomainScan />
        </div>
      </main>
    </>
  );
}