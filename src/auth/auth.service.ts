import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signJWT(userId: string, role: string) {
    const payload = { userId, role };
    return this.jwtService.sign(payload);
  }

  getPayloadData(context) {
    return context.user;
  }
}
