/**
 * Header — site navigation and brand.
 * All brand text and colors come from the business profile theme.
 */
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ profile, menuOpen, setMenuOpen }) {
  const { name, domain, content, contact } = profile;
  const shortName = name.split(' ')[0];
  const brandText = domain.replace(/\./g, '').toUpperCase();

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <Link href="/" className={styles.brand} aria-label={`${name} home`}>
          <span className={styles.brandName}>{brandText}</span>
          <span className={styles.brandAccent}>·</span>
          <span className={styles.brandName}>{shortName}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`${styles.btn} ${styles.btn}`}
            aria-label={`Contact ${name}`}
          >
            Email {contact.email.split('@')[0]}
          </Link>
        </nav>

        <button
          className={styles.mobileToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Menu aria-label="Open menu" />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[60] flex flex-col p-12 bg-[var(--theme-background)]"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="self-end mb-8"
          >
            <X aria-label="Close" />
          </button>
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-serif text-[var(--theme-text)] hover:text-[var(--theme-accent)]"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-serif text-[var(--theme-text)] hover:text-[var(--theme-accent)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 text-center bg-[var(--theme-primary)] text-[var(--theme-primary-inverse)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
