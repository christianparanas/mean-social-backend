import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// strategies
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtStrategy } from './strategies/jwt-auth.strategy';

import { UsersModule } from '../../modules/users/users.module';
import { AuthService } from './auth.service';

import { User } from '../../entities/user.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
