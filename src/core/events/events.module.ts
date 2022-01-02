import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { PostGateway } from './gateway/post.gateway';
import { EventsGateway } from './gateway/events.gateway';

import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ChatGateway, PostGateway, EventsGateway],
})
export class EventsModule {}
