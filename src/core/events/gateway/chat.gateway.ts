import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


import { ChatsService } from 'src/modules/chats/chats.service';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway {
  constructor(private chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoin(socket: Socket, data: any) {
    socket.join(data.convoId)
  }

  @SubscribeMessage('sendMsg')
  handleMessage(socket: Socket, sentData: any) {
    this.chatsService.create(sentData)

    this.server.in(sentData.convoId).emit('newMsg', sentData)
  }
}
