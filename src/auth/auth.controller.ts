import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async registration(@Body() userData: CreateUserDto): Promise<UserDto> {
    const user: us = await this.userService.findOneByEmail(userData.email);
    if (!!user) throw new BadRequestException('user exist');
    const result: UserDto = await this.userService.creatUser(userData);
    return result;
  }
}
