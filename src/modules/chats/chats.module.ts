import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

import { User } from '../../entities/user.entity';
import { Conversations } from 'src/entities/conversations';
import { Messages } from 'src/entities/messages.entity';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Messages, Conversations]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
