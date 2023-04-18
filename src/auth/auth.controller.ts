import { Controller, Post, Body, Req } from '@nestjs/common';
import { MailerService } from '@nestjs/mailer';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private mailerService: MailerService,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Req() req:Request ) {
    const { username, email } = req.body;
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }
    const token = await this.userService.createPasswordResetToken(user.id);
    const resetLink = `https://example.com/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });
    return { message: 'Password reset email sent' };
  }
}
