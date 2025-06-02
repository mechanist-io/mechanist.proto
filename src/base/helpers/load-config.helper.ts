import * as dotenv from 'dotenv';
import * as path from 'path';

const configFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

const configPath = path.resolve(process.cwd(), configFile);

// Load config for all environments
dotenv.config({
  path: configPath,
});

console.log(`📍 Environment configuration loaded from: ${configFile}`);
