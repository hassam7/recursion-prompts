import { getProblems, siteUrl } from '../lib/problem-content.js';

export async function GET() {
  const problems = await getProblems();
  const urls = [
    '/',
    '/playground/',
    ...problems.map((problem) => `/problems/${problem.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${siteUrl(url)}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}