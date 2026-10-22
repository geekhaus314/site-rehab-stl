/**
 * Build-time theme generator.
 * Reads config/business.profile.json and emits src/styles/theme.css
 * containing semantic CSS custom properties derived from the profile theme block.
 * This file is imported by src/pages/_app.js so every page inherits the client's
 * brand colors without any hardcoded brand artifacts in components.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROFILE_PATH = path.join(ROOT, 'config', 'business.profile.json');
const OUT_PATH = path.join(ROOT, 'src', 'styles', 'theme.css');

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function main() {
  let profile;
  try {
    profile = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
  } catch (err) {
    console.error(`[generate-theme] Failed to read business profile: ${err.message}`);
    process.exit(1);
  }

  const { theme } = profile;
  const primaryRgb = hexToRgb(theme.primary);
  const accentRgb = hexToRgb(theme.accent);

  // Derive inverse text color for primary (simple luminance check)
  const primaryLum =
    (0.299 * parseInt(theme.primary.slice(1, 3), 16) +
      0.587 * parseInt(theme.primary.slice(3, 5), 16) +
      0.114 * parseInt(theme.primary.slice(5, 7), 16)) /
    255;
  const primaryInverse = primaryLum > 0.5 ? '#0a0a0a' : '#ffffff';

  const css = `/* ============================================================
   * AUTO-GENERATED THEME — DO NOT EDIT BY HAND
   * Source: config/business.profile.json (id: ${profile.id})
   * Regenerate with: node scripts/generate-theme.js
   * ============================================================ */

:root {
  /* Brand colors */
  --theme-primary: ${theme.primary};
  --theme-primary-rgb: ${primaryRgb};
  --theme-primary-inverse: ${primaryInverse};
  --theme-accent: ${theme.accent};
  --theme-accent-rgb: ${accentRgb};

  /* Structural colors */
  --theme-background: ${theme.background};
  --theme-surface: ${theme.surface};
  --theme-text: ${theme.text};
  --theme-text-muted: ${theme.muted};

  /* Derived utilities */
  --theme-border: rgba(${primaryRgb}, 0.15);
  --theme-border-hover: rgba(${primaryRgb}, 0.35);
  --theme-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);

  /* Typography */
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Radius */
  --radius: 12px;

  /* Transitions */
  --transition: 220ms ease;
}
`;

  fs.writeFileSync(OUT_PATH, css, 'utf8');
  console.log(`[generate-theme] Theme CSS written to ${OUT_PATH} for profile "${profile.id}".`);
}

main();
