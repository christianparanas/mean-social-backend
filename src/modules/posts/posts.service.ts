import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// entities
import { Post } from '../../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(user: any, createPostDto: CreatePostDto) {
    try {
      await this.postRepository.save({
        textContent: createPostDto.textContent,
        privacy: createPostDto.privacy,

        // user id cant be save to the db because it cant haha
        userId: user.userId,
      });

      return {
        message: user,
        statusCode: HttpStatus.CREATED,
      };
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
