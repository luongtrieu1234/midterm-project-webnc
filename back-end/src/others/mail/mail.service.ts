import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../modules/users/users.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `http://localhost:5000/users/confirm-signup?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome! Confirm your Email',
      context: {
        // ✏️ filling curly brackets with content
        email: email,
        url,
      },
      html: `<p>Chào ${email},</p>
      <p>Vui lòng click vào link bên dưới để xác nhận:</p>
      <p>
          <a href='${url}'>Kích hoạt</a>
      </p>
      `,
    });
  }

  async sendUserResetPassword(email: string, token: string) {
    const url = `http://localhost:5000/users/confirm-reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome! Confirm your Email',
      context: {
        // ✏️ filling curly brackets with content
        email: email,
        url,
      },
      html: `<p>Chào ${email},</p>
      <p>Vui lòng click vào link bên dưới để đặt lại mật khẩu:</p>
      <p>
          <a href='${url}'>Reset password</a>
      </p>
      `,
    });
  }
}
