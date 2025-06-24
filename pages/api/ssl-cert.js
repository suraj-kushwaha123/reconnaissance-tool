// File: pages/api/ssl-cert.js

export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  const apiURL = `https://api.ssllabs.com/api/v3/analyze?host=${domain}`;

  try {
    const response = await fetch(apiURL, {
      headers: {
        'User-Agent': 'osint-tool/1.0'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data from SSL Labs' });
    }

    const data = await response.json();

    if (data.status === 'ERROR') {
      return res.status(502).json({ error: 'SSL Labs returned an error', details: data.statusMessage });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('SSL Fetch Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
