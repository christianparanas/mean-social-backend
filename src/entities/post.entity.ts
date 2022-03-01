import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

// entities
import { User } from './user.entity';
import { Likers } from './likers.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  textContent: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false, default: 'Public' })
  privacy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @OneToMany(() => Likers, (likers) => likers.post)
  likers: Likers[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
