import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { CompanyShowService } from '../services/companyshow.service'
import { Companies } from '../../entities/Company.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('companies')
export class CompanyShowController {
  constructor(private companyShowService: CompanyShowService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async execute(@Req() req: Request): Promise<Companies> {
    return await this.companyShowService.execute(req)
  }
}
