import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Patents } from './user.domain'
import { Password } from '../../utils/services/password'
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  patents: Patents[]

  @Column({ length: 100 })
  email: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    return (this.password = await Password.toHash(this.password))
  }
}
