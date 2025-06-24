// File: pages/api/socialmedia.js

const PLATFORMS = [
  { name: 'Twitter', url: 'https://twitter.com/' },
  { name: 'Instagram', url: 'https://instagram.com/' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/' },
  { name: 'GitHub', url: 'https://github.com/' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/' },
  { name: 'Pinterest', url: 'https://pinterest.com/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@' },
  { name: 'Tumblr', url: 'https://www.tumblr.com/' },
  { name: 'Facebook', url: 'https://www.facebook.com/' }
];

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const results = {};

  await Promise.all(
    PLATFORMS.map(async ({ name, url }) => {
      try {
        const response = await fetch(`${url}${username}`);
        if (!response.ok) {
          results[name] = { exists: false };
          return;
        }

        const html = await response.text();
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : null;

        results[name] = {
          exists: true,
          profileUrl: `${url}${username}`,
          title: title
        };
      } catch {
        results[name] = { exists: false };
      }
    })
  );

  res.status(200).json(results);
}
