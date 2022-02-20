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

      console.log(msg);

      if (msg.length !== 0) {
        const saveMsg = await this.messageRepo.save({
          text: data.message,
          sender: data.sender,
          conversation: msg[0].id,
        });

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
      const data = await this.conversationRepository.find({
        where: [{ sender: user.userId }, { receiver: user.userId }],
        relations: ['sender', 'receiver'],
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
      console.log(data);

      const convo = await this.messageRepo.find({
        where: { conversation: data.id },
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
