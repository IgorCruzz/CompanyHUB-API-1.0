import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Services } from '../../entities/Service.entity'
import { Repository, UpdateResult } from 'typeorm'
import { Request } from 'express'
import { Products } from '../../entities/Product.entity'
import { Companies } from '../../entities/Company.entity'

@Injectable()
export class ServiceUpdateService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,

    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { id } = req.params
    const { product_id } = req.body

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

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Você não tem permissão para deletar este serviço',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const request = JSON.stringify(req.body).toLowerCase()

    return await this.servicesRepository.update(id, JSON.parse(request))
  }
}
