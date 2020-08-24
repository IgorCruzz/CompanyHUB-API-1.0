import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Products } from '../../entities/Product.entity'
import { Repository } from 'typeorm'
import { Request } from 'express'

@Injectable()
export class ProductShowService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>
  ) {}

  async execute(req: Request): Promise<Products[]> {
    const { id } = req.params

    return await this.productsRepository.find({
      where: { company_id: id },
      relations: ['serviceConnection'],
    })
  }
}
