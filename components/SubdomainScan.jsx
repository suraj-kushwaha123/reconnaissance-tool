'use client';

import { useState } from 'react';

export default function SubdomainScan() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [subdomains, setSubdomains] = useState([]);
  const [error, setError] = useState('');

  const fetchSubdomains = async () => {
    setLoading(true);
    setError('');
    setSubdomains([]);

    try {
      const res = await fetch('/api/subdomains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error fetching subdomains');
      setSubdomains(data.subdomains);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">Subdomain Enumeration</h2>
      <input
        type="text"
        placeholder="example.com"
        className="w-full p-3 mb-3 rounded text-black"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button
        onClick={fetchSubdomains}
        disabled={loading || !domain}
        className="bg-purple-600 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Scanning...' : 'Find Subdomains'}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {subdomains.length > 0 && (
        <div className="mt-5 bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Results:</h3>
          <ul className="list-disc ml-6">
            {subdomains.map((item, index) => (
              <li key={index}>
                <span className="text-green-300">{item.host}</span> — {item.ip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
