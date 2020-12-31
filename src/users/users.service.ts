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

  addUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user)
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ username: username })
    if (user) return user;
    return null
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ email: email })
    if (user) return user;
    return null
  }
}



interface FindInterface {
  id?: string;
  username?: string;
  email?: string;
}