import { Controller, Delete, UseGuards, Req } from '@nestjs/common'
import { CompanyDeleteService } from '../services/companydelete.service'
import { DeleteResult } from 'typeorm'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('companies')
export class CompanyDeleteController {
  constructor(private companyDeleteService: CompanyDeleteService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async execute(@Req() req: Request): Promise<DeleteResult> {
    return await this.companyDeleteService.execute(req)
  }
}
