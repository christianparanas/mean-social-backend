import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { PostGateway } from './gateway/post.gateway';
import { EventsGateway } from './gateway/events.gateway';

import { User } from 'src/entities/user.entity';
import { Conversations } from 'src/entities/conversations';
import { ChatsService } from 'src/modules/chats/chats.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from 'src/modules/chats/chats.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Conversations]), ChatsModule],
  providers: [ChatGateway, PostGateway, EventsGateway],
})
export class EventsModule {}
