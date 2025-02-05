import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, code: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to our app! Confirm your Email',
      template: './verify',
      context: {
        code,
      },
    }).catch(error => {
      console.error('Failed to send verification email:', error);
      throw new BadRequestException('Failed to send verification email');
    });
  }

  async sendResetPassword(email: string, code: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      template: './reset',
      context: {
        code,
      },
    });
  }

  // Add other email sending methods as needed
}