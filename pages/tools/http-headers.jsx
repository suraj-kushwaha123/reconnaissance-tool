import Navbar from '@/components/Navbar';
import HTTPHeaders from '@/components/HTTPHeaders';

export default function HTTPHeadersPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen bg-gray-100 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-4">HTTP Headers Scanner</h1>
        <HTTPHeaders />
      </main>
    </>
  );
}
