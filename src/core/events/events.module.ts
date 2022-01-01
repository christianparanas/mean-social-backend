import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { PostGateway } from './gateway/post.gateway';

@Module({
  providers: [ChatGateway, PostGateway],
})
export class EventsModule {}
