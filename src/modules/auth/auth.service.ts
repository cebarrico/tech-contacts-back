import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
  email: string;
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

    const passMath = await compare(password, user.password);

    if (user && passMath) {
      const { id, main_email } = user;
      return { id, email };
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
