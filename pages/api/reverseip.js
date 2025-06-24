export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { ip } = req.body;

  if (!ip || typeof ip !== 'string') {
    return res.status(400).json({ error: 'Invalid IP address' });
  }

  try {
    const response = await fetch(`https://api.hackertarget.com/reverseiplookup/?q=${ip}`);
    const text = await response.text();

    if (text.includes('error')) {
      throw new Error('Reverse IP lookup failed');
    }

    const domains = text.trim().split('\n');
    res.status(200).json({ domains });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reverse IP data' });
  }
}
