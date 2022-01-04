import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { AuthModule } from '../../core/auth/auth.module';
import { User } from '../../entities/user.entity';
import { MessageParticipants } from 'src/entities/message_participants.entity';
import { Message } from 'src/entities/message.entity';
import { MessageRoom } from 'src/entities/message_room.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, MessageRoom, Message, MessageParticipants]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
