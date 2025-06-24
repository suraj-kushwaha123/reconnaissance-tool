'use client';

import { useState } from 'react';

export default function ReverseIPLookup() {
  const [ip, setIP] = useState('');
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  const [error, setError] = useState('');

  const isValidIP = (ip) => {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
  };

  const handleLookup = async () => {
    if (!isValidIP(ip)) {
      setError('Enter a valid IPv4 address like 8.8.8.8');
      return;
    }

    setLoading(true);
    setError('');
    setDomains([]);

    try {
      const res = await fetch('/api/reverseip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to lookup domains');

      setDomains(data.domains);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">Reverse IP Lookup</h2>
      <input
        type="text"
        placeholder="Enter IP (e.g. 8.8.8.8)"
        className="w-full p-3 mb-3 rounded text-black"
        value={ip}
        onChange={(e) => setIP(e.target.value)}
      />
      <button
        onClick={handleLookup}
        disabled={loading || !ip}
        className="bg-red-600 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Looking up...' : 'Find Domains'}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {domains.length > 0 && (
        <div className="mt-5 bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Domains hosted on IP:</h3>
          <ul className="list-disc ml-6">
            {domains.map((domain, index) => (
              <li key={index} className="text-green-300">{domain}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
