/**
 * Business profile loader.
 * Imports the central config/business.profile.json statically so it is
 * available at runtime without Node `fs` (which cannot be bundled for the
 * browser). Schema validation happens at build time in scripts/validate-config.js.
 */
import profile from '../config/business.profile.json';

export function getBusinessProfile() {
  return profile;
}

export function getBusinessSchema() {
  // Schema is validated at build time; re-export for reference.
  return require('../config/business.schema.json');
}

export function resolveDomain(profile) {
  return profile.domain;
}

export function resolveSiteUrl(profile) {
  const protocol = typeof process !== 'undefined' && process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${profile.domain}`;
}

export function resolveTheme(profile) {
  return profile.theme;
}

export function resolveContent(profile) {
  return profile.content;
}

export function resolveContact(profile) {
  return profile.contact;
}
