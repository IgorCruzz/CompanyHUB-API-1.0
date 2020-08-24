import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { ProductIndexService } from '../services/productindex.service'
import { Products } from '../../entities/Product.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('products')
export class ProductIndexController {
  constructor(private productIndexService: ProductIndexService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async execute(@Req() req: Request): Promise<Products[]> {
    return await this.productIndexService.execute(req)
  }
}
