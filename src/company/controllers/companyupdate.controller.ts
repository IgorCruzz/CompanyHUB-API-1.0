import { Controller, Put, UseGuards, Req } from '@nestjs/common'
import { CompanyUpdateService } from '../services/companyupdate.service'
import { UpdateResult } from 'typeorm'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('companies')
export class CompanyUpdateController {
  constructor(private companyUpdateService: CompanyUpdateService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return await this.companyUpdateService.execute(req)
  }
}
