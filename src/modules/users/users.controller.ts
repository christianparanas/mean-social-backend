import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// guards
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../core/auth/guards/local-auth.guard';

// authService
import { AuthService } from '../../core/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {}

  @Post("register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) { // req.user data from local-auth validate method
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
