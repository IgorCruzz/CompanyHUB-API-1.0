import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Products } from '../../entities/Product.entity'
import { Repository, DeleteResult } from 'typeorm'
import { Request } from 'express'
import { Users } from '../../entities/User.entity'
import { Companies } from '../../entities/Company.entity'

@Injectable()
export class ProductDeleteService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>
  ) {}

  async execute(req: Request): Promise<DeleteResult> {
    const { id } = req.params
    const { company_id } = req.body

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

    const product = await this.productsRepository.findOne({ id: Number(id) })

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Insira um ID valido',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return await this.productsRepository.delete(id)
  }
}
