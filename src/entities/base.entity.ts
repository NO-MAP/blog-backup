import { Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Base {
  @CreateDateColumn({ name: 'create_date' })
  createDate;

  @UpdateDateColumn({ name: 'update_date' })
  updateDate;
}