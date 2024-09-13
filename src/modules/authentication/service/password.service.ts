import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import configurations from 'src/config/configurations';

@Injectable()
export class PasswordService {
  validatePassword(password: string): { isValid: boolean; message: string } {
    // Define password complexity rules
    const minLength = 8;
    const maxLength = 16;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if password meets all complexity requirements
    if (
      password.length >= minLength &&
      password.length <= maxLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return {
        isValid: true,
        message: 'Password meets complexity requirements',
      };
    } else {
      let errorMessage = 'Password does not meet the following requirements:';
      if (password.length < minLength) {
        errorMessage += ' Minimum length of 8 characters';
      }
      if (password.length > maxLength) {
        errorMessage += ' Maximum length of 16 characters';
      }
      if (!hasUppercase) {
        errorMessage += ' At least one uppercase letter';
      }
      if (!hasLowercase) {
        errorMessage += ' At least one lowercase letter';
      }
      if (!hasNumber) {
        errorMessage += ' At least one number';
      }
      if (!hasSpecialChar) {
        errorMessage += ' At least one special character';
      }
      return { isValid: false, message: errorMessage };
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      configurations().security.saltrounds,
    );
    return hashedPassword;
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
