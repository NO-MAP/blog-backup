import { BeforeInsert, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Generated, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/roles/role.entity";

@Entity()
export class User {
  @PrimaryColumn({name: 'user_id'})
  @Generated('uuid')
  id: string;

  @Column({ length: 20, name: 'user_name' })
  userName: string;

  @Column({ length: 50, name: 'email' })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({name: 'user_role'})
  roles: Role[];

  @CreateDateColumn()
  createDate;

  @UpdateDateColumn()
  updateDate;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}