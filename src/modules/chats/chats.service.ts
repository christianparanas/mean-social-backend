import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { MessageRoom } from 'src/entities/message_room.entity';
import { Message } from 'src/entities/message.entity';
import { MessageParticipants } from 'src/entities/message_participants.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(MessageRoom)
    private msgRoomRepository: Repository<MessageRoom>,
    @InjectRepository(MessageRoom)
    private messageRepo: Repository<Message>,
    @InjectRepository(MessageRoom)
    private messageParticipantsRepo: Repository<MessageParticipants>,
  ) {}

  async create(data: any) {
    console.log(data);
    try {
      const roomId = uuidv4();

     this.msgRoomRepository.save({
        uuid: roomId,
        type: 'private',
      });

      this.messageRepo.save({
        message: data.message,
        messageRoom: roomId,
        user: data.sender,
      });

      this.messageParticipantsRepo.save({
        messageRoom: roomId,
        user: data.reciever,
      });

      this.messageParticipantsRepo.save({
        messageRoom: roomId,
        user: data.sender,
      });

      return {
        message: 'Sent!',
        statusCode: HttpStatus.CREATED,
      };
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    try {
      const allMsgs = await this.msgRoomRepository.find({
        relations: ['message'],
        order: {
          updatedAt: 'DESC',
        },
      });

      return {
        messages: allMsgs,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
