import { IsNotEmpty, IsEmail, IsString, isNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  textContent: string;

  @IsString()
  @IsNotEmpty()
  privacy: string;
}
