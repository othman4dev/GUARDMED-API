import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(email: string, code: number): Promise<void>;
    sendResetPassword(email: string, code: number): Promise<void>;
}
