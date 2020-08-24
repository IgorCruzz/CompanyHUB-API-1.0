import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { CompanyCreateService } from '../services/companycreate.service'
import { Companies } from '../../entities/Company.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('companies')
export class CompanyCreateController {
  constructor(private companyCreateService: CompanyCreateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async execute(@Req() req: Request): Promise<Companies> {
    return await this.companyCreateService.execute(req)
  }
}
