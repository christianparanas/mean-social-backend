import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { User } from '../../entities/user.entity';
import { Post } from '../../entities/post.entity';
import { Messages } from '../../entities/messages.entity';
import { Conversations } from '../../entities/conversations';

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
        entities: [User, Post, Messages, Conversations],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
