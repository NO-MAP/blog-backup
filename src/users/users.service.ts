import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly rolesService: RolesService
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const defaultRole: Role | undefined = await this.rolesService.searchOne({ roleCode: 'SYS:user' })
    if (!defaultRole) throw new BadRequestException("系统未设置默认角色")
    const user: User = this.usersRepository.create(createUserDto);
    user.roles = [defaultRole];
    return this.usersRepository.save(user)
  }

  async findOne(find: FindInterface): Promise<User | undefined> {
    const { id, userName, email } = find;
    let user: User | undefined;
    if (id) {
      user = await this.usersRepository.findOne({ id })
      return user;
    }
    if (userName) {
      user = await this.usersRepository.findOne({ userName })
      return user
    }
    if (email) {
      user = await this.usersRepository.findOne({ email })
      return user
    }
  }

  async findOneByIdWithRoles(id: string): Promise<User | undefined> {
    const user: User | undefined = await this.usersRepository.findOne({ id }, {
      relations: ['roles']
    })
    return user;
  }
}



interface FindInterface {
  id?: string;
  userName?: string;
  email?: string;
}