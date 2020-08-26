import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '../../entities/User.entity'
import { Repository } from 'typeorm'
import * as Bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import { Tokens } from '../../entities/Token.entity'
import { Request } from 'express'
import RegisterMail from '../../email/jobs/RegisterMail'

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Tokens)
    private tokenRepository: Repository<Tokens>
  ) {}

  async execute(req: Request): Promise<Users> {
    const { email, name, password } = req.body

    const userEmail = await this.usersRepository.findOne({ email })

    if (userEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Este e-mail já está em uso, escolha outro',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const user = await this.usersRepository.save({
      name: name.toLowerCase(),
      email: email.toLowerCase().trim(),
      password_hash: Bcrypt.hashSync(password, 8),
    })

    const token = await this.tokenRepository.save({
      user_id: user.id,
      token: crypto.randomBytes(10).toString('hex'),
    })

    await RegisterMail.handle({
      email: user.email,
      token: token.token,
    })

    return user
  }
}
