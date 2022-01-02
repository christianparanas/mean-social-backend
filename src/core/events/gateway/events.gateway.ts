import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  activeUsers = {};

  @SubscribeMessage('userOnline')
  handleMessage(socket: Socket, data: any) {
    // set user status to online
    this.setUserOnline(data);

    this.activeUsers[socket.id] = data;

    socket.broadcast.emit('userIsOnline', 'Hey');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
    console.log(this.activeUsers);

    for (var key in this.activeUsers) {
      if (key == client.id) {
        this.setUserOffline(this.activeUsers[key]);
      }
    }
  }

  async setUserOnline(id: any) {
    this.userRepository.update(id, { isOnline: 'true' });
  }

  async setUserOffline(id: any) {
    this.userRepository.update(id, { isOnline: 'false' });
  }
}
