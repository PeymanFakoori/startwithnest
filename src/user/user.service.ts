import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ email });
  }

  async creatUser(body: CreateUserDto): Promise<UserEntity> {
    const data: CreateUserDto = { ...body };
    data.password = await hash(data.password, process.env.HASH_ROUNDS);

    const result: UserEntity = this.usersRepository.create(body);
    return this.usersRepository.save(result);
  }
}
