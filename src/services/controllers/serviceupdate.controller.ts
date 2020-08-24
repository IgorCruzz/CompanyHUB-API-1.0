import { Controller, Put, Req, UseGuards } from '@nestjs/common'
import { ServiceUpdateService } from '../services/serviceupdate.service'
import { UpdateResult } from 'typeorm'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('services')
export class ServiceUpdateController {
  constructor(private serviceUpdateService: ServiceUpdateService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return await this.serviceUpdateService.execute(req)
  }
}
