import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Companies } from '../../entities/Company.entity'
import { Repository } from 'typeorm'
import { Users } from '../../entities/User.entity'
import { Request } from 'express'

@Injectable()
export class CompanyIndexService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<Companies[]> {
    const user = await this.usersRepository.findOne({ id: Number(req.user) })

    if (!user.administrator) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Você não tem permissão para acessar esta rota',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return await this.companiesRepository.find({
      relations: ['productConnection'],
    })
  }
}
