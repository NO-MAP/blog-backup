import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../entities/role.entity';
import { update } from 'lodash';

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

interface updateRoleInterface {
  id: string;
  roleName?: string;
  roleCode?: string;
  description?: string;
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

  async findAllRoles(): Promise<Role[]> {
    const roles: Role[] = await this.rolesRepository.find({
      order: {
        createDate: "ASC"
      }
    });
    return roles
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

  async updateRole(updateData: updateRoleInterface) {
    let role: Role | undefined = await this.rolesRepository.findOne(updateData.id)
    if (!role) throw new BadRequestException(`角色${updateData.id}不存在`)
    role = {
      ...role,
      ...updateData
    }
    await this.rolesRepository.save(role)
    return role
  }

  async delRole(id: string): Promise<boolean> {
    const result = await this.rolesRepository.delete(id);
    if (!result.affected) throw new BadRequestException('删除失败');
    return true;
  }
}
