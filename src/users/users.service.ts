import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PageQueryUserDto } from './dto/page-query-user.dto';
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

  async checkUser(check: CheckInterface): Promise<CheckResultInterface> {
    const result: CheckResultInterface = {
      success: true,
      message: []
    }
    const keys = Object.keys(check);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const findOneOptions = {};
      findOneOptions[key] = check[key];
      const user: User | undefined = await this.usersRepository.findOne(findOneOptions as FindOneOptions<User>)
      if (user) {
        result.success = false;
        result.message.push(`${key}已存在`)
      }
    }
    return result
  }

  async findOne(find: FindInterface): Promise<User | undefined> {
    const user: User | undefined = await this.usersRepository.findOne(find as FindOneOptions<User>)
    return user
  }

  async findOneByIdWithRoles(id: string): Promise<User | undefined> {
    const user: User | undefined = await this.usersRepository.findOne({ id }, {
      relations: ['roles']
    })
    return user;
  }

  async updateUser(updateData: updateUserInterface): Promise<User> {
    const { id, userName, email, roles } = updateData;
    const user: User | undefined = await this.usersRepository.findOne(id)
    if (!user) throw new BadRequestException(`用户${id}不存在`)
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (roles) {
      const _roles = await this.rolesService.findRolesByIds(roles)
      user.roles = _roles
    }
    await this.usersRepository.save(user)
    return user
  }

  async pageQueryUser(pageQueryUser: PageQueryUserDto): Promise<any> {
    const { current, pageSize, userName, email } = pageQueryUser;
    const result = this.usersRepository.findAndCount({
      where: {
        userName: Like(`%${userName || ''}%`),
        email: Like(`%${email || ''}%`),
      },
      skip: (current - 1) * pageSize,
      take: pageSize,
      relations: ['roles']
    })
    return result;

    // const qb = this.usersRepository.createQueryBuilder('user')
    // if (userName) qb.where("user.userName like :userName", { userName: `%${userName}%` })
    // if (email) qb.where("user.email like :email", { email: `%${email}%` })
    // const result = await qb
    //   .skip((current - 1) * pageSize)
    //   .take(pageSize)
    //   .getManyAndCount()
    // return result
  }
}

interface updateUserInterface {
  id: string;
  userName?: string;
  email?: string;
  roles?: string[];
}

interface FindInterface {
  id?: string;
  userName?: string;
  email?: string;
}

interface CheckInterface {
  userName?: string;
  email?: string;
}

interface CheckResultInterface {
  success: boolean;
  message?: string[];
}