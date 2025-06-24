import { useState } from 'react';

export default function SocialMediaLookup() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/socialmedia?username=${username}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: 'Failed to fetch social media status' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Social Media Lookup</h2>
      <input
        type="text"
        placeholder="Enter username"
        className="w-full p-2 rounded border border-gray-300"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleLookup}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Social Media'}
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 text-gray-800 p-4 rounded space-y-2">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            Object.entries(result).map(([platform, data]) => (
              <div key={platform} className="p-2 border-b last:border-none">
                <strong>{platform}:</strong>{' '}
                {data.exists ? (
                  <a
                    href={data.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:underline"
                  >
                    {data.title || 'Profile found ✅'}
                  </a>
                ) : (
                  <span className="text-red-600">Not Found ❌</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
