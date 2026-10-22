/**
 * Build-time validation of the business profile against JSON Schema.
 * Exits non-zero if validation fails, halting the build.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT, 'config', 'business.schema.json');
const PROFILE_PATH = path.join(ROOT, 'config', 'business.profile.json');

function main() {
  let schema, profile;
  try {
    schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  } catch (err) {
    console.error(`[validate-config] Failed to read schema: ${err.message}`);
    process.exit(1);
  }
  try {
    profile = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
  } catch (err) {
    console.error(`[validate-config] Failed to read business profile: ${err.message}`);
    process.exit(1);
  }

  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(profile);

  if (!valid) {
    console.error('[validate-config] Business profile failed schema validation:');
    for (const err of validate.errors) {
      console.error(`  - ${err.instancePath || '/'}: ${err.message}`);
    }
    process.exit(1);
  }

  console.log(`[validate-config] Business profile "${profile.id}" validated OK against schema.`);
}

main();
