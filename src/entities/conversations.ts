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

  @CreateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Messages, (message) => message.conversation)
  messages: Messages[];

  @ManyToOne(() => User, (user) => user)
  sender: User;

  @ManyToOne(() => User, (user) => user)
  receiver: User;
}
