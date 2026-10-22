/**
 * Layout — shared shell for every page.
 * Receives `profile` via _app and passes it down to Header/Footer.
 * Zero hardcoded brand artifacts; all content comes from the business profile.
 */
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, profile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = profile.content.services.map((service) => ({
    href: '#services',
    label: service.title,
  }));

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <a href="#main" className="skipLink">
        Skip to main content
      </a>

      <Header profile={profile} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="main" className="content">
        {children}
      </main>

      <Footer profile={profile} />
    </>
  );
}
