import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Products } from '../../entities/Product.entity'
import { Repository, UpdateResult } from 'typeorm'
import { Request } from 'express'
import { Users } from '../../entities/User.entity'
import { Companies } from '../../entities/Company.entity'

@Injectable()
export class ProductUpdateService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { id } = req.params
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

    const request = JSON.stringify(req.body).toLowerCase()

    return await this.productsRepository.update(id, JSON.parse(request))
  }
}
