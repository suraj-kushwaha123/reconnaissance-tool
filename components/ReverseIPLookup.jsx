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
    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-lg space-y-4">
      <input
        type="text"
        placeholder="Enter IP (e.g. 8.8.8.8)"
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        value={ip}
        onChange={(e) => setIP(e.target.value)}
      />
      <button
        onClick={handleLookup}
        disabled={loading || !ip}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition duration-200 disabled:opacity-50"
      >
        {loading ? 'Looking up...' : 'Find Domains'}
      </button>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      {domains.length > 0 && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg text-sm text-green-300 overflow-x-auto">
          <pre>{JSON.stringify(domains, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
