import Navbar from '@/components/Navbar';
import DomainRecon from '@/components/DomainRecon';

export default function DomainReconPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-gray-100 p-6 mt-16">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-100">Domain Recon</h1>
        <DomainRecon />
      </main>
    </>
  );
}
