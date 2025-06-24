export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { input } = req.body;

  if (!input) return res.status(400).json({ error: 'Input is required' });

  try {
    const response = await fetch(`https://api.iptoasn.com/v1/as/ip/${input}`);
    const data = await response.json();

    if (data && data.as_number) {
      return res.status(200).json(data);
    }

    // Try reverse AS to IP info if input is an ASN
    if (/^AS\d+$/i.test(input)) {
      const asn = input.toUpperCase().replace('AS', '');
      const res2 = await fetch(`https://stat.ripe.net/data/as-overview/data.json?resource=AS${asn}`);
      const data2 = await res2.json();

      if (data2 && data2.data) {
        return res.status(200).json(data2.data);
      }
    }

    res.status(404).json({ error: 'ASN data not found' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}