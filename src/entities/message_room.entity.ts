import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// entities
import { Message } from './message.entity';
import { MessageParticipants } from './message_participants.entity';

@Entity()
export class MessageRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.messageRoom)
  messages: Message[];

  @OneToMany(
    () => MessageParticipants,
    (messageParticipants) => messageParticipants.messageRoom,
  )
  messageParticipants: MessageParticipants[];
}
