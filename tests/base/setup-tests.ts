import * as dotenv from 'dotenv';
import * as path from 'path';

// Set NODE_ENV to test if not already set
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Load the .env.test file from the root directory
dotenv.config({
  path: path.resolve(__dirname, '../../.env.test'),
  override: true, // This ensures .env.test values override any existing environment variables
});

console.log('✅ Test environment loaded with .env.test configuration');
console.log(`📍 Environment: ${process.env.ENV || process.env.NODE_ENV}`);
