/**
 * blog/[slug].js — Dynamic blog post route.
 * Reads MDX posts from content/blog/ via lib/posts.
 */
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(postsDirectory)) {
    return { paths: [], fallback: false };
  }
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
  return {
    paths: fileNames.map((fileName) => ({ params: { slug: fileName.replace(/\.mdx$/, '') } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const fullPath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return { notFound: true };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: { post: { slug, ...data, content } },
  };
}

export default function BlogPost({ post, profile }) {
  const { domain } = profile;
  const siteUrl = `https://${domain}`;

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.description || post.excerpt || ''} />
        <link rel="canonical" href={`${siteUrl}/blog/${post.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description || post.excerpt || '',
              datePublished: post.date,
              dateModified: post.dateModified || post.date,
              author: { '@type': 'Person', name: profile.name },
              publisher: { '@type': 'Organization', name: profile.name, url: siteUrl },
            }),
          }}
        />
      </Head>

      <main className="min-h-[60vh]">
        <section className="band">
          <div className="container">
            <article>
              <span className="eyebrow block mb-3">{post.category || 'Journal'}</span>
              <h1 className="heading mb-4">{post.title}</h1>
              <p className="muted text-lg mb-6">{post.description || post.excerpt || ''}</p>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <p className="muted mt-8">
                {post.date} &bull; {post.readingTime || '5 min read'}
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
