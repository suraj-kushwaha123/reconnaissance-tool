export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  const apiURL = `https://api.ssllabs.com/api/v3/analyze?host=${domain}&publish=off&startNew=on&all=done`;

  try {
    const maxRetries = 10;
    let attempt = 0;
    let delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (attempt < maxRetries) {
      const response = await fetch(apiURL, {
        headers: {
          'User-Agent': 'osint-tool/1.0'
        }
      });

      const data = await response.json();

      if (data.status === 'READY') {
        return res.status(200).json(data);
      }

      if (data.status === 'ERROR') {
        return res.status(502).json({ error: 'SSL Labs returned an error', details: data.statusMessage });
      }

      attempt++;
      await delay(3000); // wait 3 seconds before next attempt
    }

    res.status(504).json({ error: 'SSL check timed out. Try again later.' });
  } catch (err) {
    console.error('SSL Fetch Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
