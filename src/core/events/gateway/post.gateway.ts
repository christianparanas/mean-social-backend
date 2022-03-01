import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Post } from 'src/entities/post.entity';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200', 'https://lorem-dev.herokuapp.com/'] } })
export class PostGateway {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}


  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newPost')
  handleMessage(socket: Socket) {
    // send event to all connected user except for the post author or sender
    socket.broadcast.emit('newPostIndicator', 'Load new posts.');
  }

  @SubscribeMessage('likeOrUnlikePost')
  handlePostLikeUnlike(socket: Socket) {
    console.log("hello")
  }
}
