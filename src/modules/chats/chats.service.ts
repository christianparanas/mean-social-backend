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

  // async create(data: any) {
  //   try {
  //     this.msgRoomRepository
  //       .find({
  //         id: data.roomId,
  //       })
  //       .then(async (res: any) => {
  //         console.log(res);

  //         if (res.length == 0) {
  //           try {
  //             this.msgRoomRepository
  //               .save({
  //                 type: 'private',
  //               })
  //               .then((room) => {
  //                 this.messageRepo.save({
  //                   message: data.message,
  //                   messageRoom: room.id,
  //                   user: data.sender,
  //                 });

  //                 this.messageParticipantsRepo.save({
  //                   messageRoom: room.id,
  //                   user: data.reciever,
  //                 });

  //                 this.messageParticipantsRepo.save({
  //                   messageRoom: room.id,
  //                   user: data.sender,
  //                 });
  //               });
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         } else {
  //           this.messageRepo.save({
  //             message: data.message,
  //             messageRoom: res.id,
  //             user: data.sender,
  //           });
  //         }
  //       });

  //     // return {
  //     //   statusCode: HttpStatus.CREATED,
  //     // };
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // async getUserChats(user) {
  //   try {
  //     const par: any = await this.messageParticipantsRepo.find({
  //       where: {
  //         user: user.userId,
  //       },
  //       relations: ['messageRoom'],
  //       order: {
  //         updatedAt: 'DESC',
  //       },
  //     });

  //     let datas: any = [];

  //      par.map(async (room: any, index) => {
  //       await this.msgRoomRepository
  //         .find({
  //           where: {
  //             id: room.messageRoom.id,
  //           },
  //           order: {
  //             updatedAt: 'DESC',
  //           },
  //         })
  //         .then((data) => {
  //           datas[index] = data;
  //         });
  //     });

  //     return {
  //       messages: datas,
  //       statusCode: HttpStatus.OK,
  //     };
  //   } catch (err) {
  //     return err;
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
