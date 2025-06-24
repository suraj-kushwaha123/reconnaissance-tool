// File: components/ImageReverseSearch.jsx

import { useState } from 'react';

export default function ImageReverseSearch() {
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/reverse-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setResultUrl(data.url);
      } else {
        alert('Failed to upload');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <input
        type="file"
        accept="image/*"
        className="block mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-lime-500 text-black font-semibold px-4 py-2 rounded hover:bg-lime-600"
      >
        {loading ? 'Uploading...' : 'Search'}
      </button>
      {resultUrl && (
        <div className="mt-6 text-center">
          <p className="text-green-400">Search submitted. View results:</p>
          <a
            href={resultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {resultUrl}
          </a>
        </div>
      )}
    </div>
  );
}
