// pages/tools/email-breach.jsx
import Navbar from '@/components/Navbar';
import EmailBreachCheck from '@/components/EmailBreachCheck';

export default function EmailBreachCheckPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 bg-gray-100 text-gray-900 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">📧 Email Breach Check</h1>
        <div className="max-w-2xl mx-auto">
          <EmailBreachCheck />
        </div>
      </main>
    </>
  );
}
