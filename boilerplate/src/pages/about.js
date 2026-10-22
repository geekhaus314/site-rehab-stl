/**
 * about.js — About page.
 * Driven entirely by the business profile content block.
 */
import Head from 'next/head';
import Page from '../components/Page.module.css';

export default function About({ profile }) {
  const { name, domain, content, contact } = profile;
  const siteUrl = `https://${domain}`;
  const shortName = name.split(' ')[0];

  return (
    <>
      <Head>
        <title>About {shortName} | {name}</title>
        <meta name="description" content={content.about.body} />
        <link rel="canonical" href={`${siteUrl}/about`} />
      </Head>

      <main className={Page.page} id="about">
        <section className="hero relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[var(--theme-surface)]/90 z-0" />
          <div className="container relative z-10 text-center max-w-3xl px-8">
            <span className="eyebrow">{content.tagline}</span>
            <h1 className="heading">{content.about.headline}</h1>
            <p className="muted text-xl mt-4">{content.description}</p>
          </div>
        </section>

        <section className="section" aria-labelledby="story-heading">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">Our story</span>
              <h2 id="story-heading" className="heading">Our story</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="lede text-lg">{content.about.body}</p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="values-heading">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">Our values</span>
              <h2 id="values-heading" className="heading">How we work</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Excellence', body: 'We never compromise on quality. Every detail matters.' },
                { title: 'Personalization', body: 'Your needs are unique. We customize every solution.' },
                { title: 'Confidentiality', body: 'Your privacy is paramount. All information is handled with discretion.' },
              ].map((value, i) => (
                <article key={i} className="card">
                  <h3 className="text-xl mb-2">{value.title}</h3>
                  <p className="muted">{value.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section text-center" aria-labelledby="contact-heading">
          <div className="container">
            <span className="eyebrow">Contact {shortName}</span>
            <h2 id="contact-heading" className="heading">Ready to talk?</h2>
            <p className="muted mt-4 max-w-md mx-auto">
              {contact.address}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${contact.email}`} className="btn">
                Email {contact.email.split('@')[0]}
              </a>
              <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="btn btn-ghost">
                {contact.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
