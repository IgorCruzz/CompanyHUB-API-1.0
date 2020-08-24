import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Companies } from '../../entities/Company.entity'
import { Repository, UpdateResult } from 'typeorm'
import { Request } from 'express'
import { Users } from '../../entities/User.entity'

@Injectable()
export class CompanyUpdateService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { id } = req.params

    const companyExists = await this.companiesRepository.findOne({
      id: Number(id),
    })

    if (!companyExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Insira um ID válido',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const user = await this.usersRepository.findOne({ id: Number(req.user) })

    if (user.id !== companyExists.user_id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Você não tem permissão parar alterar dados de outra empresa',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const request = JSON.stringify(req.body).toLowerCase()

    return await this.companiesRepository.update(id, JSON.parse(request))
  }
}
