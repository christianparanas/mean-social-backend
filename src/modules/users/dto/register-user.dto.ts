
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}