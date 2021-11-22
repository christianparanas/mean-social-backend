import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { AuthModule } from '../../core/auth/auth.module';
import { User } from '../../entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
