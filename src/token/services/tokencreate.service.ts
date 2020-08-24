import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tokens } from '../../entities/Token.entity'
import { Repository, UpdateResult } from 'typeorm'
import { Users } from '../../entities/User.entity'
import { Request } from 'express'

@Injectable()
export class TokenCreateService {
  constructor(
    @InjectRepository(Tokens)
    private tokenRepository: Repository<Tokens>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { token } = req.params

    const tokenExists = await this.tokenRepository.findOne({
      where: { token },
    })

    if (!tokenExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Token Invalído',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const user = await this.userRepository.findOne({ id: tokenExists.user_id })

    return await this.userRepository.update(user.id, {
      activation: true,
    })
  }
}
