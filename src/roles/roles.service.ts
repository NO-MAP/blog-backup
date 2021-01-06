import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../entities/role.entity';

interface searchInterface {
  roleName?: string;
  roleCode?: string;
}


interface CheckInterface {
  roleName?: string;
  roleCode?: string;
}

interface CheckResultInterface {
  success: boolean;
  message?: string[];
}

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) { }

  findOneById(id: string): Promise<Role | undefined> {
    return this.rolesRepository.findOne(id)
  }

  addRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role: Role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role)
  }

  async searchOne(search: searchInterface): Promise<Role | undefined> {
    const role: Role | undefined = await this.rolesRepository.findOne(search as FindOneOptions<Role>)
    return role;
  }

  async findRolesByIds(ids: string[]): Promise<Role[]> {
    const roles: Role[] = await this.rolesRepository.findByIds(ids)
    return roles
  }

  async checkRole(check: CheckInterface): Promise<CheckResultInterface> {
    const result: CheckResultInterface = {
      success: true,
      message: []
    }
    const keys = Object.keys(check);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const findOneOptions = {};
      findOneOptions[key] = check[key];
      const role: Role | undefined = await this.rolesRepository.findOne(findOneOptions as FindOneOptions<Role>)
      if (role) {
        result.success = false;
        result.message.push(`${key}已存在`)
      }
    }

    return result
  }
}
