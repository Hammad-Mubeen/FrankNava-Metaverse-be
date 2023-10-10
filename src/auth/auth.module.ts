import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRY_TIME },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
