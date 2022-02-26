import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

// entities
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Likers {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post)
  post: Post;

  @ManyToOne(() => User, (user) => user)
  user: User;
}