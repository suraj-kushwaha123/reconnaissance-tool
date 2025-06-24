'use client';

import { useState } from 'react';

export default function EmailBreachCheck() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [breaches, setBreaches] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setBreaches(null);

    try {
      const res = await fetch('/api/emailbreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.status === 404) {
        setBreaches([]); // No breaches found
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setBreaches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Email Breach Check</h2>
      <input
        type="email"
        placeholder="Enter email address"
        className="w-full p-3 rounded mb-4 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleCheck}
        disabled={loading || !email}
        className="bg-red-600 px-5 py-3 rounded text-white disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Breach'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {breaches && breaches.length === 0 && (
        <p className="mt-4 text-green-400">No breaches found for this email.</p>
      )}

      {breaches && breaches.length > 0 && (
        <div className="mt-6 bg-gray-800 p-4 rounded text-sm">
          <h3 className="font-semibold mb-2">Breaches Found:</h3>
          <ul className="list-disc list-inside max-h-48 overflow-y-auto">
            {breaches.map((breach) => (
              <li key={breach.Name} className="mb-1">
                <strong>{breach.Title}</strong> - {breach.Domain} <br />
                Breach Date: {breach.BreachDate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
