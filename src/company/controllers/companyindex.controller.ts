import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { CompanyIndexService } from '../services/companyindex.service'
import { Companies } from '../../entities/Company.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('companies')
export class CompanyIndexController {
  constructor(private companyIndexService: CompanyIndexService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async execute(@Req() req: Request): Promise<Companies[]> {
    return await this.companyIndexService.execute(req)
  }
}
