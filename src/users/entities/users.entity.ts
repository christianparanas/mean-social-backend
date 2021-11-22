import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
