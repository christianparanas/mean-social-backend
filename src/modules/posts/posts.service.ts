import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// entities
import { Post } from '../../entities/post.entity';
import { Likers } from '../../entities/likers.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Likers) private likersRepository: Repository<Likers>
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
        relations: ['user', "likers", "likers.user"],
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

  async reactPost(data: any) {

    try {
      const isAlreadyReacted = await this.likersRepository.find({
        where: {
          post: data.postId,
          user: data.likerId
        }
      })

      if(isAlreadyReacted.length == 0) {
        await this.likersRepository.save({
          post: data.postId,
          user: data.likerId
        })

        return
      }

      // if already reacted, remove the reaction if the user hit this endpoint
      await this.likersRepository.delete({
        post: data.postId,
        user: data.likerId
      })

      
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
