import { Controller, Put, UseGuards, Req } from '@nestjs/common'
import { ProductUpdateService } from '../services/productupdate.service'
import { UpdateResult } from 'typeorm'
import { Request } from 'express'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'

@Controller('products')
export class ProductUpdateController {
  constructor(private productUpdateService: ProductUpdateService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return await this.productUpdateService.execute(req)
  }
}
