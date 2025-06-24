export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing URL. Please include http/https.' });
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    const headers = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    res.status(200).json({ headers });
  } catch (err) {
    console.error('Header fetch failed:', err);
    res.status(500).json({ error: 'Failed to fetch headers' });
  }
}
