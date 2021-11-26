import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  textContent: string;

  @IsString()
  @IsNotEmpty()
  privacy: string;

}
