import { BeforeInsert, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()

export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdate;

  @UpdateDateColumn()
  updatedate;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}