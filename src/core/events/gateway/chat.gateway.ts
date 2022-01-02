import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMsg')
  handleMessage(socket: Socket, message: string) {
    this.server.emit('newMsg', message);
  }
}
