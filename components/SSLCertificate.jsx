import { useState } from 'react';

export default function SSLCertificate() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await fetch(`/api/ssl-cert?domain=${domain}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to fetch SSL data' });
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Enter domain (e.g. google.com)"
        className="w-full p-2 rounded border border-gray-300"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button
        onClick={handleCheck}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Check SSL
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto">
          <pre className="text-sm text-gray-800">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
