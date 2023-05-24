import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

interface UserLogin {
  id: string;
  main_email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email or password are wrong');
    }

    const passMath = await compare(password, user.password);

    if (user && passMath) {
      const { id, main_email } = user;
      return { id, email };
    }
    return null;
  }

  async login(user: UserLogin) {
    const payload = { email: user.main_email, id: user.id };
    const userFind = await this.userService.findByEmail(user.main_email);
    return {
      token: this.jwtService.sign(payload, { subject: userFind.id }),
    };
  }
}
