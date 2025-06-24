export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { domain } = req.body;

  if (!domain || typeof domain !== 'string') {
    return res.status(400).json({ error: 'Invalid domain' });
  }

  try {
    const response = await fetch(`https://api.hackertarget.com/hostsearch/?q=${domain}`);
    const text = await response.text();

    if (text.includes("error")) {
      throw new Error("Failed to fetch subdomains.");
    }

    const subdomains = text
      .trim()
      .split('\n')
      .map((line) => {
        const [host, ip] = line.split(',');
        return { host, ip };
      });

    res.status(200).json({ subdomains });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Subdomain enumeration failed' });
  }
}
