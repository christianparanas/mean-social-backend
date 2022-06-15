import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(req.user, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post("react")
  reactPost(@Request() req) {
    return this.postsService.reactPost(req.body);
  }

  @Post("reactors")
  findPostreactors(@Request() req) {
    return this.postsService.postReactors(req.body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
