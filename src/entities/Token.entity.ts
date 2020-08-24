import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Users } from './User.entity'

@Entity()
export class Tokens {
  @PrimaryColumn()
  user_id: number

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column()
  token: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
