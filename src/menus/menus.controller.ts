import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenusService } from './menus.service';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(
    private readonly menuService: MenusService,
  ) { }

  @Get('/tree')
  getAllMenuTree() {
    return this.menuService.getAllMenuTree()
  }

  @Post()
  addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenu(createMenuDto)
  }

  
}
