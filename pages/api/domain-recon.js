// File: pages/api/domain-recon.js (using RDAP free WHOIS alternative)

export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  const url = `https://rdap.org/domain/${domain}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'RDAP fetch failed', details: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
