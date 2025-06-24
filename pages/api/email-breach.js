// File: pages/api/email-breach.js

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  // Mock result: treat certain domains as "breached"
  const breachedDomains = ['test.com', 'example.com'];
  const isBreached = breachedDomains.some(domain => email.endsWith(domain));

  if (isBreached) {
    return res.status(200).json({
      breached: true,
      breaches: [
        { name: 'MockBreachSite', domain: 'mock.com', date: '2022-05-01' },
        { name: 'ExampleBreach', domain: 'example.com', date: '2023-02-10' }
      ]
    });
  } else {
    return res.status(200).json({ breached: false });
  }
}
