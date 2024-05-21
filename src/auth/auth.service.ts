import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './auth.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string): Promise<any> {
    return this.userService.getUserByUsername(username);
  }

  async login(data: LoginInput) {
    const user = await this.validateUser(data.username);
    if (!user) throw new UnauthorizedException();
    const payload: JwtPayload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
