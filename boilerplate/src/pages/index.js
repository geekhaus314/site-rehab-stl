/**
 * index.js — Homepage.
 * Hero, services, about preview, and CTA — all driven by the business profile.
 */
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Scissors, Users } from 'lucide-react';
import Page from '../components/Page.module.css';

const iconMap = {
  ShieldCheck,
  Zap,
  Scissors,
  Users,
};

export default function Home({ profile }) {
  const { name, domain, content, contact } = profile;
  const siteUrl = `https://${domain}`;
  const shortName = name.split(' ')[0];
  const brandText = domain.replace(/\./g, '').toUpperCase();

  return (
    <>
      <Head>
        <title>{content.tagline} | {name}</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name,
              description: content.description,
              url: siteUrl,
              telephone: contact.phone,
              email: contact.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: contact.address,
              },
              areaServed: [{ '@type': 'City', name: 'Local Service Area' }],
              priceRange: '$$',
              makesOffer: content.services.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.title },
              })),
            }),
          }}
        />
      </Head>

      <main className={Page.page} id="home">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <span className="eyebrow">{content.tagline}</span>
              <h1 id="hero-heading" className="heading">
                {content.hero.headline}
              </h1>
              <p className="lede">{content.hero.subheadline}</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn">
                  {content.hero.ctaLabel}
                </Link>
                <a href={`mailto:${contact.email}`} className="btn btn-ghost">
                  Email {contact.email.split('@')[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="band" aria-labelledby="services-heading">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">Services</span>
              <h2 id="services-heading" className="heading">
                Built around what your business needs
              </h2>
              <p className="lede">
                Select the service that matches your situation. If you are not
                sure, we will tell you which one fits.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.services.map((service, i) => {
                const Icon = iconMap[service.title] || ShieldCheck;
                return (
                  <article
                    key={i}
                    className="card group"
                    aria-label={service.title}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--theme-surface)] flex items-center justify-center mb-5 group-hover:bg-[var(--theme-accent)] transition-colors border border-[var(--theme-border)] group-hover:border-[var(--theme-border-hover)]">
                      <Icon className="w-6 h-6 text-[var(--theme-primary)] group-hover:text-[var(--theme-primary-inverse)]" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl mb-3">{service.title}</h3>
                    <p className="muted">{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="about-heading">
          <div className="container">
            <div className="sectionHead">
              <span className="eyebrow">About {shortName}</span>
              <h2 id="about-heading" className="heading">
                {content.about.headline}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="lede text-lg">{content.about.body}</p>
            </div>
          </div>
        </section>

        <section className="band" aria-labelledby="contact-heading">
          <div className="container text-center">
            <div className="sectionHead">
              <span className="eyebrow">Get in touch</span>
              <h2 id="contact-heading" className="heading">
                Let's make it one less thing to worry about.
              </h2>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${contact.email}`} className="btn">
                Email {contact.email.split('@')[0]}
              </a>
              <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="btn btn-ghost">
                {contact.phone}
              </a>
            </div>
            <p className="muted mt-4">{contact.address}</p>
          </div>
        </section>
      </main>
    </>
  );
}
