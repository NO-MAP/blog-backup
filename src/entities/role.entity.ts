import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Role extends Base {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ length: 20, name: 'role_name' })
  roleName: string;

  @Column({ length: 10, name: 'role_code' })
  roleCode: string;

  @Column({ length: 150, name: 'role_description' })
  description: string;

}
