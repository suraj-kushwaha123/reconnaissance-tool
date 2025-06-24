import { useState } from 'react';

export default function DomainRecon() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!domain) return;

    try {
      // Placeholder for your backend call
      const response = await fetch(`/api/domain-recon?domain=${domain}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Enter domain (e.g. example.com)"
        className="w-full p-2 rounded border border-gray-300"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
