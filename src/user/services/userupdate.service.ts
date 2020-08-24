import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { Users } from '../../entities/User.entity'
import { Request } from 'express'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { id } = req.params

    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não existe um usuário com este ID',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    if (user.id !== req.user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Você não tem permissão para excluir a conta de outro usuário',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const { password, confirmPassword, ...data } = req.body

    if (data.email !== user.email) {
      const userEmail = await this.usersRepository.find({
        where: {
          email: data.email,
        },
      })

      if (userEmail.length !== 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Este e-mail já está em uso, escolha outro',
          },
          HttpStatus.BAD_REQUEST
        )
      }
    }

    if (data.oldPassword) {
      const comparePassword = await bcrypt.compare(
        data.oldPassword,
        user.password_hash
      )

      if (!comparePassword) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'A senha está incorreta',
          },
          HttpStatus.BAD_REQUEST
        )
      }

      const { oldPassword, ...rest } = data

      return await this.usersRepository.update(user.id, {
        password_hash: bcrypt.hashSync(password, 8),
        ...rest,
      })
    }

    return await this.usersRepository.update(user.id, {
      ...data,
    })
  }
}
