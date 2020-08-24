import { Controller, Delete, UseGuards, Req } from '@nestjs/common'
import { ProductDeleteService } from '../services/productdelete.service'
import { DeleteResult } from 'typeorm'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('products')
export class ProductDeleteController {
  constructor(private productDeleteService: ProductDeleteService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async execute(@Req() req: Request): Promise<DeleteResult> {
    return await this.productDeleteService.execute(req)
  }
}
