import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: false })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;
}
