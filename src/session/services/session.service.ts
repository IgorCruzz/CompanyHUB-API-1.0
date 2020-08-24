import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '../../entities/User.entity'
import { ILoginSuccessDTO } from '../session.dto'
import * as Bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async execute(req: Request): Promise<ILoginSuccessDTO> {
    const { email, password } = req.body

    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não existe um usuário com este e-mail',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const comparePassword = await Bcrypt.compare(password, user.password_hash)

    if (!comparePassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'A senha está incorreta',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    if (!user.activation) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Você precisa ativar sua conta pelo link enviado para seu e-mail',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return {
      id: user.id,
      administrator: user.administrator,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ sub: user.id }),
    }
  }
}
