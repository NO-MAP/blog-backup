import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryColumn({name: 'role_id'})
  @Generated('uuid')
  id: string;

  @Column({length: 20, name: 'role_name'})
  roleName: string;

  @Column({length: 10, name: 'role_code'})
  roleCode: string;

  @Column({length: 150, name: 'role_description'})
  description: string;

  @CreateDateColumn({name: 'create_date'})
  createDate;

  @UpdateDateColumn({name: 'update_date'})
  updateDate;
}
