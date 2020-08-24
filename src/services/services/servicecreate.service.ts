import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Services } from '../../entities/Service.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Products } from '../../entities/Product.entity'
import { Companies } from '../../entities/Company.entity'

@Injectable()
export class ServiceCreateService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,

    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<Services> {
    const { name, description, product_id } = req.body

    const company = await this.companiesRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          id: Number(req.user),
        },
      },
    })

    const product = await this.productsRepository.findOne({
      where: {
        company_id: company.id,
        id: product_id,
      },
    })

    if (!product && !company.user.administrator) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Você não tem permissão para cadastrar um serviço neste produto',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return await this.servicesRepository.save({
      name: name.toLowerCase(),
      description: description,
      product_id,
    })
  }
}
