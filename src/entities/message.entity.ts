import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

// entities
import { Post } from './post.entity';
import { User } from './user.entity';
import { MessageRoom } from './message_room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MessageRoom, (messageRoom) => messageRoom.message)
  messageRoom: MessageRoom;

  @ManyToOne(() => User, (user) => user.message)
  user: User;
}
