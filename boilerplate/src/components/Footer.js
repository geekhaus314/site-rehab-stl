/**
 * Footer — site footer with brand, contact, and legal.
 * All content comes from the business profile.
 */
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer({ profile }) {
  const { name, domain, content, contact } = profile;
  const currentYear = new Date().getFullYear();
  const shortName = name.split(' ')[0];

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.wrap}>
        <div className={styles.stack}>
          <a href="/" className={styles.brand} aria-label={`${name} home`}>
            {domain.replace(/\./g, '').toUpperCase()}
            <span className={styles.brandAccent}>·{shortName}</span>
          </a>
          <p className={styles.contactLine}>
            {content.tagline}
          </p>
          <p className={styles.contactLine}>
            {contact.email}
          </p>
          <p className={styles.contactLine}>
            <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>
              {contact.phone}
            </a>
          </p>
        </div>

        <div className={styles.stack}>
          <p className={styles.heading}>What we do</p>
          <ul className={styles.linkList}>
            {content.services.map((service, i) => (
              <li key={i}>
                <a href="#services">{service.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stack}>
          <p className={styles.heading}>Contact</p>
          <ul className={styles.linkList}>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>
                {contact.phone}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>

      <p className={styles.copyright}>
        © {currentYear} {content.footer.copyrightEntity}. All rights reserved.
      </p>
    </footer>
  );
}
