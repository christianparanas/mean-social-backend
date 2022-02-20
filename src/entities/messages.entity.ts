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
import { Conversations } from './conversations';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user)
  sender: User;

  @ManyToOne(() => Conversations, (conversations) => conversations)
  conversation: Conversations;


}
