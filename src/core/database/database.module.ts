import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { User } from '../../entities/user.entity';
import { Post } from '../../entities/post.entity';
import { Message } from '../../entities/message.entity';
import { MessageParticipants } from '../../entities/message_participants.entity';
import { MessageRoom } from '../../entities/message_room.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Post, Message, MessageParticipants, MessageRoom],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
