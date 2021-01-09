import { BeforeInsert, Column, Entity, PrimaryColumn, Generated, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/entities/role.entity";
import { Base } from "./base.entity";

@Entity()
export class User extends Base {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ length: 20, name: 'user_name' })
  userName: string;

  @Column({ length: 50, name: 'email' })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role' })
  roles: Role[];


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}