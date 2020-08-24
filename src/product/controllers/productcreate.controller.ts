import { Controller, Post, UseGuards, Req } from '@nestjs/common'
import { ProductCreateService } from '../services/productcreate.service'
import { Products } from '../../entities/Product.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('products')
export class ProductCreateController {
  constructor(private productCreateService: ProductCreateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async execute(@Req() req: Request): Promise<Products> {
    return await this.productCreateService.execute(req)
  }
}
