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

  @CreateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post)
  post: Post;

  @ManyToOne(() => User, (user) => user)
  user: User;
}