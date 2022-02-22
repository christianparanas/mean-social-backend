import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Conversations } from 'src/entities/conversations';
import { Messages } from 'src/entities/messages.entity';
import { parse } from 'path/posix';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Conversations)
    private conversationRepository: Repository<Conversations>,
    @InjectRepository(Messages) private messageRepo: Repository<any>,
  ) {}

  async create(data: any) {
    try {
      const msg = await this.conversationRepository.find({
        where: [
          { sender: data.sender, receiver: data.receiver },
          { sender: data.receiver, receiver: data.sender },
        ],
      });

      if (msg.length !== 0) {
        await this.messageRepo.save({
          text: data.message,
          sender: data.sender,
          conversation: msg[0].id,
        });

        await this.conversationRepository.update(
          {
            id: msg[0].id,
          },
          {
            id: msg[0].id,
          },
        );

        return;
      }

      const saveConvoRes = await this.conversationRepository.save({
        sender: data.sender,
        receiver: data.receiver,
      });

      const saveMsgRes = await this.messageRepo.save({
        text: data.message,
        sender: data.sender,
        conversation: saveConvoRes.id,
      });
    } catch (err) {
      return err;
    }
  }

  async getUserChats(user) {
    try {
      const data: any = await this.conversationRepository.find({
        where: [{ sender: user.userId }, { receiver: user.userId }],
        relations: ['sender', 'receiver', 'messages'],
        order: {
          updatedAt: 'DESC',
        },
      });

      return {
        messages: data,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
  }

  async getConvo(data) {
    try {
      if (data.hasConvo) {
        const convo = await this.messageRepo.find({
          where: { conversation: data.id },
          relations: ['sender'],
        });

        return { convo: convo };
      }

      const findConvoRes = await this.conversationRepository.find({
        where: [
          { sender: data.id.par1, receiver: data.id.par2 },
          { sender: data.id.par2, receiver: data.id.par1 },
        ],
      });

      const convo = await this.messageRepo.find({
        where: { conversation: findConvoRes[0].id },
        relations: ['sender'],
      });

      return { convo: convo };
    } catch (e) {
      return e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
