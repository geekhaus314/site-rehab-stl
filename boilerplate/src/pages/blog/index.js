/**
 * blog/index.js — Blog listing page.
 */
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default function BlogIndex({ posts, profile }) {
  const { domain } = profile;
  const siteUrl = `https://${domain}`;

  return (
    <>
      <Head>
        <title>Blog | Blog</title>
        <meta name="description" content="Articles and resources." />
        <link rel="canonical" href={`${siteUrl}/blog`} />
      </Head>

      <main className="min-h-[60vh]">
        <section className="band">
          <div className="container">
            <span className="eyebrow block mb-3">Journal</span>
            <h1 className="heading mb-8">Latest articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.slug} className="card">
                  <span className="muted text-xs uppercase tracking-wider block mb-2">{post.category || 'Journal'}</span>
                  <h3 className="text-xl mb-2">{post.title}</h3>
                  <p className="muted mb-4">{post.description || post.excerpt || ''}</p>
                  <Link href={`/blog/${post.slug}`} className="text-[var(--theme-accent)] font-bold text-sm uppercase tracking-wider">
                    Read &rarr;
                  </Link>
                </article>
              ))}
              {posts.length === 0 && (
                <p className="muted text-center py-12">No articles yet.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
