// AuthHelpers.ts
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(input: string, stored: string) {
  return await bcrypt.compare(input, stored);
}
