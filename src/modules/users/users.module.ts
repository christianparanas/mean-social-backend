import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { AuthModule } from '../../core/auth/auth.module';
import { User } from '../../entities/user.entity';
import { Conversations } from 'src/entities/conversations';
import { Messages } from 'src/entities/messages.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Messages, Conversations]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
