import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto {
  id: number;
  email: string;
  isAdmin: string;

  @IsNotEmpty()
  password: string;
}
