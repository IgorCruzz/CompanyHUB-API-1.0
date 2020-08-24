import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Companies } from '../../entities/Company.entity'
import { Request } from 'express'

@Injectable()
export class CompanyCreateService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<Companies> {
    const { cnpj, name } = req.body

    const company = await this.companiesRepository.findOne({
      user_id: Number(req.user),
    })

    if (company) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Você já possui uma empresa cadastrada',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const companyCnpj = await this.companiesRepository.find({
      where: {
        cnpj: cnpj
          .split('.')
          .join('')
          .split('/')
          .join('')
          .split('-')
          .join(''),
      },
    })

    if (companyCnpj.length !== 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Já existe uma empresa cadastrada com esse cnpj',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return await this.companiesRepository.save({
      name: name.toLowerCase().trim(),
      cnpj: cnpj
        .split('.')
        .join('')
        .split('/')
        .join('')
        .split('-')
        .join(''),
      user_id: Number(req.user),
    })
  }
}
