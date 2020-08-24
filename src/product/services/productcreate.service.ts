import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Products } from '../../entities/Product.entity'
import { Request } from 'express'
import { Companies } from '../../entities/Company.entity'

@Injectable()
export class ProductCreateService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<Products> {
    const { name, company_id } = req.body

    const company = await this.companiesRepository.findOne({
      user_id: Number(req.user),
    })

    if (company.id !== company_id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Você não tem permissão para cadastrar um produto em outra empresa',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    const productName = await this.productsRepository.findOne({ name })

    if (productName) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Este nome ja está em uso, escolha outro',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return await this.productsRepository.save({
      name: name.toLowerCase(),
      company_id,
    })
  }
}
