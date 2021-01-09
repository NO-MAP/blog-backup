import { Column, Entity, Generated, PrimaryColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { Base } from "./base.entity";

@Entity()
@Tree('closure-table')
export class Menu extends Base {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ name: 'menu_name' })
  name: string;

  @Column({ name: 'menu_path' })
  path: string;

  @Column({ name: 'menu_component' })
  component: string;

  @Column({ name: 'menu_redirect' })
  redirect: string;

  @Column({ name: 'menu_keepalive' })
  keepalive: boolean;

  @Column({ name: 'menu_title' })
  title: string;

  @Column({ name: 'menu_icon' })
  icon: string;

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;
}