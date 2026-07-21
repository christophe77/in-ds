import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '@/data/site';
import { url } from '@/lib/url';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: `${SITE.name} — Industrial UI blog`,
    description:
      'Articles on industrial interface design: HMI alarm design, framework-agnostic components and design tokens.',
    site: context.site ?? 'https://christophe77.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      author: post.data.author,
      categories: post.data.tags,
      link: url(`/blog/${post.id}`),
    })),
  });
}
