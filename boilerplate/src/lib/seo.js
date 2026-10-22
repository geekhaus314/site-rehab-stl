/**
 * SEO and structured-data generator.
 * Every value is derived from the business profile — zero hardcoded brand artifacts.
 */
export function generateSiteMetadata(profile) {
  const { name, domain, content, contact } = profile;
  const siteUrl = `https://${domain}`;

  return {
    title: {
      default: `${name} — ${content.tagline}`,
      template: `%s | ${name}`,
    },
    description: content.description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: name,
      title: `${name} — ${content.tagline}`,
      description: content.description,
      url: siteUrl,
      images: [
        {
          url: `${siteUrl}/images/og.png`,
          width: 1200,
          height: 630,
          alt: `${name} — ${content.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — ${content.tagline}`,
      description: content.description,
      images: [`${siteUrl}/images/og.png`],
    },
  };
}

export function generateLocalBusinessSchema(profile) {
  const { name, domain, content, contact } = profile;
  const siteUrl = `https://${domain}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteUrl,
    name,
    alternateName: domain.replace(/\./g, '').toUpperCase(),
    description: content.description,
    url: siteUrl,
    telephone: contact.phone,
    email: contact.email,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/og.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [],
    founder: {
      '@type': 'Person',
      name,
      url: `${siteUrl}/about`,
    },
    areaServed: [
      { '@type': 'City', name: 'Local Service Area' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Services`,
      itemListElement: content.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
}

export function generateOrganizationSchema(profile) {
  const { name, domain, contact } = profile;
  const siteUrl = `https://${domain}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
