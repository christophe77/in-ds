import type { APIContext } from 'astro';
import { url } from '@/lib/url';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://christophe77.github.io');
  const sitemap = new URL(url('/sitemap-index.xml'), site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
