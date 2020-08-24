import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import { Users } from '../../entities/User.entity'
import { Request } from 'express'

@Injectable()
export class UserDeleteService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<DeleteResult> {
    const { id } = req.params

    const user = await this.usersRepository.findOne({ id: Number(id) })

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

    return await this.usersRepository.delete(user.id)
  }
}
