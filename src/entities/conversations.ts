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
import { Messages } from './messages.entity';
import { User } from './user.entity'

@Entity()
export class Conversations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Messages, (message) => message)
  messages: Messages[];

  @ManyToOne(() => User, (user) => user)
  sender: User;

  @ManyToOne(() => User, (user) => user)
  receiver: User;
}
