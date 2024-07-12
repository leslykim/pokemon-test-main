import * as crypto from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

export function getEncryptedKey(): string {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('SECRET_KEY not found in environment variables');
  }
  return crypto.SHA256(secretKey).toString();
}