import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

// entities
import { Post } from './post.entity';
import { Message } from './message.entity';
import { MessageParticipants } from './message_participants.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  uid: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false, default: 'false' })
  isOnline: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Message, (message) => message.user)
  message: Message;

  @OneToMany(
    () => MessageParticipants,
    (messageParticipants) => messageParticipants.messageRoom,
  )
  messageParticipants: MessageParticipants;
}
