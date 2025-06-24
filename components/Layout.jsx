export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-400 mb-2">
            OSINT Recon Tool
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Powerful all-in-one OSINT reconnaissance toolkit
          </p>
        </header>
        <main className="space-y-16">{children}</main>
        <footer className="mt-20 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} OSINT Recon Tool. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
