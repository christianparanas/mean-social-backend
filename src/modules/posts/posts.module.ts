import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entity
import { Post } from '../../entities/post.entity'
import { Likers } from '../../entities/likers.entity'

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post, Likers]),
  ],
})
export class PostsModule {}
