import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Products } from '../../entities/Product.entity'
import { Repository } from 'typeorm'
import { Users } from '../../entities/User.entity'
import { Request } from 'express'

@Injectable()
export class ProductIndexService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async execute(req: Request): Promise<Products[]> {
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

    return await this.productsRepository.find({
      relations: ['serviceConnection', 'companyConnection'],
      order: {
        company_id: 'ASC',
      },
    })
  }
}
