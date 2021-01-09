import { Module } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entities/menu.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu])
  ],
  controllers: [MenusController],
  providers: [MenusService]
})
export class MenuModule { }
