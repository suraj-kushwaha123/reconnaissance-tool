import { useState } from 'react';

export default function IPGeoLookup() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);

  const handleLookup = async () => {
    try {
      const res = await fetch(`/api/ip-geo?ip=${ip}`);
      const result = await res.json();
      setData(result);
    } catch {
      setData({ error: 'Failed to fetch IP info' });
    }
  };

  const getFlagEmoji = (countryCode) => {
    return countryCode
      ? String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 127397 + c.charCodeAt()))
      : '🌐';
  };

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Enter IP address"
        className="w-full p-2 rounded border border-gray-300"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button
        onClick={handleLookup}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Lookup
      </button>

      {data && !data.error && (
        <div className="bg-gray-100 text-gray-800 p-4 rounded">
          <p><strong>IP:</strong> {data.ip}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Region:</strong> {data.region}</p>
          <p><strong>Country:</strong> {data.country_name} {getFlagEmoji(data.country)}</p>
          <p><strong>Latitude:</strong> {data.latitude}</p>
          <p><strong>Longitude:</strong> {data.longitude}</p>

          <iframe
            className="mt-4 w-full h-64 rounded"
            src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=10&output=embed`}
            allowFullScreen
          />
        </div>
      )}

      {data?.error && <p className="text-red-500">{data.error}</p>}
    </div>
  );
}
