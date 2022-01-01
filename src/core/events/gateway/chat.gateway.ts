import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('connected');
  }

  handleDisconnect(client: any) {
    console.log('disconnect');
  }

  @SubscribeMessage('sendMsg')
  handleMessage(socket: Socket, message: string) {
    this.server.emit('newMsg', message);
  }
}
