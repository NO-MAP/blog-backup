import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entities/menu.entity';
import { TreeRepository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: TreeRepository<Menu>
  ) { }

  async getAllMenuTree(): Promise<Menu[]> {
    return this.menuRepository.findTrees()
  }



  async addMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu: Menu = this.menuRepository.create();
    menu.name = createMenuDto.name;
    menu.path = createMenuDto.path;
    menu.component = createMenuDto.component;
    menu.redirect = createMenuDto.redirect;
    menu.keepalive = createMenuDto.keepalive;
    menu.title = createMenuDto.title;
    menu.icon = createMenuDto.icon;
    if(createMenuDto.parentId) {
      const parent: Menu = await this.menuRepository.findOne(createMenuDto.parentId);
      menu.parent = parent;
    }
    await this.menuRepository.save(menu)
    
    return menu;
  }
}
