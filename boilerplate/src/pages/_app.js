/**
 * _app.js — Top-level component wrapper.
 * Injects the business profile into every page via Layout and loads global
 * theme CSS. No brand values hardcoded here.
 */
import '../styles/globals.css';
import '../styles/theme.css';
import Layout from '../components/Layout';
import { getBusinessProfile } from '../lib/business';

export default function MyApp({ Component, pageProps }) {
  const profile = getBusinessProfile();

  return (
    <Layout profile={profile}>
      <Component {...pageProps} profile={profile} />
    </Layout>
  );
}
