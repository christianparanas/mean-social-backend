import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Request() req) {
    return this.chatsService.create(req.body);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
