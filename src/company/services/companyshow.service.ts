import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Companies } from '../../entities/Company.entity'
import { Repository } from 'typeorm'
import { Request } from 'express'

@Injectable()
export class CompanyShowService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<Companies> {
    const { id } = req.params

    const company = await this.companiesRepository.findOne({
      where: { user_id: Number(id) },
      relations: ['productConnection'],
    })

    if (!company) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Você não cadastrou sua empresa ainda',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return company
  }
}
