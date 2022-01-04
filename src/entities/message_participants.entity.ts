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
import { MessageRoom } from './message_room.entity';
import { User } from './user.entity';

@Entity()
export class MessageParticipants {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MessageRoom, (messageRoom) => messageRoom.messages)
  messageRoom: MessageRoom;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
