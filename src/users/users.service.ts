import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash, genSalt } from 'bcrypt';

import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// entities
import { Users } from './entities/users.entity';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  private readonly users = [
    {
      userId: 2,
      username: 'maria',
      password: String(hash('chan', 10)),
    },
  ];

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async register(registerUserDto: RegisterUserDto) {
    if (await this.userRepository.findOne({ email: registerUserDto.email })) {
      throw new BadRequestException('Email already in use!');
    }

    const hashedPassword = await hash(
      registerUserDto.password,
      await genSalt(),
    );

    await this.userRepository.save({
      email: registerUserDto.email,
      password: hashedPassword,
    });

    return { message: 'Successfully Registered!', statusCode: HttpStatus.CREATED };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
