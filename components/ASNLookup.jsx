// components/ASNLookup.jsx
'use client';

import { useState } from 'react';

export default function ASNLookup() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/asnlookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">ASN Info Lookup</h2>
      <input
        type="text"
        placeholder="Enter IP address or ASN (e.g. AS15169)"
        className="w-full p-3 rounded mb-4 text-black"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleLookup}
        disabled={loading || !input}
        className="bg-yellow-600 px-5 py-3 rounded text-white disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Lookup ASN'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-800 text-white p-4 rounded text-sm whitespace-pre-wrap">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
