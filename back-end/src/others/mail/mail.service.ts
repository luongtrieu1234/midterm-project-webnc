import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../modules/users/users.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `${process.env.SERVER_URL}/users/confirm-signup?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <classroom@gmail.com>', // override default from
      subject: 'Welcome! Confirm your Email',
      context: {
        // ✏️ filling curly brackets with content
        email: email,
        url,
      },
      html: `<p>Chào ${email},</p>
      <p>Vui lòng nhập mã xác nhận bên dưới để kích hoạt tài khoản:</p>
      <p>
        <b>${token}</b>
      </p>
      <p>Mã xác nhận có hiệu lực trong vòng 15 phút</p>
      `,
    });
  }

  async sendUserResetPassword(email: string, token: string) {
    const url = `${process.env.SERVER_URL}/users/confirm-reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <classroom@gmail.com>', // override default from
      subject: 'Welcome! Confirm your Email',
      context: {
        // ✏️ filling curly brackets with content
        email: email,
        url,
      },
      html: `<p>Chào ${email},</p>
      <p>Vui lòng nhập mã xác nhận bên dưới để đặt lại mật khẩu:</p>
      <p>
          <b>${token}</b>
      </p>
      <p>Mã xác nhận có hiệu lực trong vòng 15 phút</p>
      `,
    });

    return { message: 'success' };
  }

  async sendInvitationTeacher(email: string, token: string, className: string) {
    const url = `${
      process.env.SERVER_URL
    }/class/accept-join-class-by-teacher?className=${className.replace(/ /g, '+')}&token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <classroom@gmail.com>', // override default from
      subject: `Lời mời cùng dạy lớp: "${className}"`,
      context: {
        // ✏️ filling curly brackets with content
        email: email,
        url,
      },
      html: `<p>Chào ${email},</p>
      <p>Bạn đã được mời cùng dạy</p>
      <p>${className}</p>
      <p>
          <a href=${url}>Chấp nhận lời mời<a/>
      </p>
      <p>Mã xác nhận có hiệu lực trong vòng 15 phút</p>
      `,
    });

    return { message: 'success' };
  }

  async sendInvitationStudent(email: string, token: string, className: string) {
    const url = `${
      process.env.SERVER_URL
    }/class/accept-join-class-by-student?className=${className.replace(/ /g, '+')}&token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <classroom@gmail.com>', // override default from
      subject: `Lời mời tham gia lớp học: "${className}"`,
      context: {
        // ✏️ filling curly brackets with content
        email: email,
        url,
      },
      html: `<p>Chào ${email},</p>
      <p>Bạn đã được mời tham gia</p>
      <p>${className}</p>
      <p>
          <a href=${url}>Chấp nhận lời mời<a/>
      </p>
      <p>Mã xác nhận có hiệu lực trong vòng 15 phút</p>
      `,
    });

    return { message: 'success' };
  }
}
