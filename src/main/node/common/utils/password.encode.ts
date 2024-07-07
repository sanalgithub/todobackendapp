import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordEncoder {
  constructor() {}
  async encode(password: string): Promise<string> {
    return hash(password, 10);
  }

  async matches(hash: string, raw: string): Promise<boolean> {
    return compare(raw, hash);
  }
}
