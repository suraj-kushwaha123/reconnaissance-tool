'use client';

import { useState } from 'react';

export default function ReverseWhois() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const res = await fetch('/api/reversewhois', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch results');

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">Reverse WHOIS Lookup</h2>
      <input
        type="text"
        placeholder="Enter registrant info (name/email)"
        className="w-full p-3 mb-3 rounded text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        disabled={loading || !query}
        className="bg-indigo-700 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {results && (
        <div className="mt-5 bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96">
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
