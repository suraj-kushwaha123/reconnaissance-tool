export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  const url = `https://ipinfo.io/${ip}/json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'Fetch failed', details: errorText });
    }

    const data = await response.json();
    const [latitude, longitude] = data.loc?.split(',') || [];

    res.status(200).json({ ...data, latitude, longitude });
  } catch (err) {
    console.error('IP Geo Lookup Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
