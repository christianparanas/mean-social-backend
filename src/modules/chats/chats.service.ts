import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { MessageRoom } from 'src/entities/message_room.entity';
import { Message } from 'src/entities/message.entity';
import { MessageParticipants } from 'src/entities/message_participants.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(MessageRoom)
    private msgRoomRepository: Repository<MessageRoom>,
    @InjectRepository(Message)
    private messageRepo: Repository<any>,
    @InjectRepository(MessageParticipants)
    private messageParticipantsRepo: Repository<any>,
  ) {}

  async create(data: any) {
    try {
      this.msgRoomRepository
        .find({
          id: data.roomId
        })
        .then(async (res: any) => {
          console.log(res);

          if (res.length == 0) {
            try {
              this.msgRoomRepository
                .save({
                  type: 'private',
                })
                .then((room) => {
                  this.messageRepo.save({
                    message: data.message,
                    messageRoom: room.id,
                    user: data.sender,
                  });

                  this.messageParticipantsRepo.save({
                    messageRoom: room.id,
                    user: data.reciever,
                  });

                  this.messageParticipantsRepo.save({
                    messageRoom: room.id,
                    user: data.sender,
                  });
                });

            } catch (error) {
              console.log(error);
            }
          } else {
            this.messageRepo.save({
              message: data.message,
              messageRoom: res.id,
              user: data.sender,
            });
          }
        });

      // return {
      //   statusCode: HttpStatus.CREATED,
      // };
    } catch (err) {
      return err;
    }
  }

  async getUserChats(user) {
    try {
      const rooms: any = await this.messageParticipantsRepo.find({
        where: {
          user: user.userId,
        },
        relations: ['messageRoom'],
        order: {
          updatedAt: 'DESC',
        },
      });

      let roomsIdArr: any = [];

      rooms.map((room: any) => {
        roomsIdArr.push(room.messageRoom.id);
      });

      let peopleArr: any = [];

      roomsIdArr.map((pp, index) => {
        peopleArr.push({
          messageRoom: roomsIdArr[index],
        });
      });

      const people = await this.messageParticipantsRepo.find({
        where: peopleArr,
        relations: ['user', 'messageRoom'],
        order: {
          updatedAt: 'DESC',
        },
      });

      const result = people.filter((person) => person.user.id != user.userId);

      return {
        messages: result,
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
