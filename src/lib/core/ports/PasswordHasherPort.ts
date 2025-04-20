// src/lib/core/ports/PasswordHasherPort.ts
export interface PasswordHasherPort {
    hash(password: string): Promise<string>;
    compare(raw: string, hashed: string): Promise<boolean>;
  }
  