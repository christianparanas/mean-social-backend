import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class PostGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newPost')
  handleMessage(socket: Socket) {
    // send event to all connected user except for the post author or sender
    socket.broadcast.emit('newPostIndicator', 'Load new posts.');
  }
}
