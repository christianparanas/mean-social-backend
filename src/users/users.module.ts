import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { AuthModule } from '../auth/auth.module';
import { Users } from './entities/users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Users]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
