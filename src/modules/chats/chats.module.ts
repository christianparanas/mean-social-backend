import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

import { User } from '../../entities/user.entity';
import { MessageRoom } from 'src/entities/message_room.entity';
import { Message } from 'src/entities/message.entity';
import { MessageParticipants } from 'src/entities/message_participants.entity';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, MessageRoom, Message, MessageParticipants]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
