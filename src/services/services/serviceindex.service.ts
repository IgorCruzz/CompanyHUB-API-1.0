import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Services } from '../../entities/Service.entity'
import { Users } from '../../entities/User.entity'
import { Request } from 'express'

@Injectable()
export class ServiceIndexService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<Services[]> {
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

    return await this.servicesRepository.find()
  }
}
