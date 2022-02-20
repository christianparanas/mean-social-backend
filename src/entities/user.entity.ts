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
import { Messages } from './messages.entity';
import { Conversations } from './conversations';


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

  @OneToMany(() => Messages, (message) => message.conversation)
  messages: Messages[];

  @OneToMany(() => Conversations, (convo) => convo.messages)
  conversations: Conversations[];
}
