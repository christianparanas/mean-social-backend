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
        user: user.userId,
      });

      return {
        message: 'Posted!',
        statusCode: HttpStatus.CREATED,
      };
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    try {
      const allPosts = await this.postRepository.find({
        relations: ['user'],
        order: {
          updatedAt: 'DESC',
        },
      });

      return {
        posts: allPosts,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
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
