import { useState } from 'react';

export default function DomainRecon() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!domain) return;

    try {
      const response = await fetch(`/api/domain-recon?domain=${domain}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-lg space-y-4">
      <input
        type="text"
        placeholder="Enter domain (e.g. example.com)"
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition duration-200"
      >
        Search
      </button>

      {result && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg text-sm text-green-300 overflow-x-auto">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
