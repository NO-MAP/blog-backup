import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  addUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(user)
  }

  findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username: username })
  }
}
