import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Users } from './User.entity'
import { Products } from './Product.entity'

@Entity()
export class Companies {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  cnpj: string

  @Column()
  user_id: number

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user?: Users

  @OneToMany(
    () => Products,
    product => product.companyConnection
  )
  productConnection?: Products[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
