import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';

import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// entities
import { User } from '../../entities/user.entity';
import { Messages } from 'src/entities/messages.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Messages) private messagesRepo: Repository<any>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    if (await this.userRepository.findOne({ email: registerUserDto.email })) {
      throw new BadRequestException('Email already in use!');
    }

    const hashedPassword = await hash(
      registerUserDto.password,
      await genSalt(),
    );

    await this.userRepository.save({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hashedPassword,
    });

    return {
      message: 'Successfully Registered!',
      statusCode: HttpStatus.CREATED,
    };
  }

  async loginWithGoogle(data) {
    if (await this.userRepository.findOne({ uid: data.id })) {
      throw new BadRequestException('User Already Exist.');
    }

    const hashed = await hash(data.sub, await genSalt());

    await this.userRepository.save({
      uid: data.id,
      name: data.name,
      email: data.email,
      image: data.image,
      password: hashed,
    });

    return {
      message: 'Successfully Registered!',
      statusCode: HttpStatus.CREATED,
    };
  }

  getProfile(user: any) {
    return this.userRepository.findOne({
      where: { id: user.userId },
      relations: ['posts', 'posts.user'],
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async getUsers(user: any) {
    try {
      const allUsers = await this.userRepository.find({
        where: { id: Not(user.userId) },
        order: {
          updatedAt: 'DESC',
        },
      });

      return {
        users: allUsers,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
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
