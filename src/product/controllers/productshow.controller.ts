import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { Products } from '../../entities/Product.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'
import { ProductShowService } from '../services/productshow.service'

@Controller('products')
export class ProductShowController {
  constructor(private productShowService: ProductShowService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async execute(@Req() req: Request): Promise<Products[]> {
    return await this.productShowService.execute(req)
  }
}
