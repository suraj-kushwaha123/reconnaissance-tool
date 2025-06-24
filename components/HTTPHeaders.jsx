import { useState } from 'react';

export default function HTTPHeaders() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    try {
      const res = await fetch(`/api/http-headers?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: 'Failed to fetch headers' });
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Enter full URL (e.g. https://example.com)"
        className="w-full p-2 rounded border border-gray-300"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleScan}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Scan Headers
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 text-gray-800 p-4 rounded overflow-x-auto">
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
