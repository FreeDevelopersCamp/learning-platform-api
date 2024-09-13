import { Injectable } from '@nestjs/common';
import { promises as dns } from 'dns';

@Injectable()
export class EmailValidationService {
  validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async validateDomain(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    try {
      const records = await dns.resolveMx(domain);
      return records && records.length > 0;
    } catch (error) {
      return false;
    }
  }
}
