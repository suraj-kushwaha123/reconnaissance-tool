export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query' });
  }

  const API_KEY = process.env.REVERSE_WHOIS_API_KEY;
  const API_URL = 'https://reverse-whois.whoisxmlapi.com/api/v2';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: API_KEY,
        mode: 'purchase',
        basicSearchTerms: {
          include: [query],
        },
      }),
    });

    const text = await response.text();
    console.log("Raw response from API:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error('Error parsing JSON:', err.message);
      return res.status(502).json({ error: 'Invalid response from external API' });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'API error' });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Server error occurred' });
  }
}
