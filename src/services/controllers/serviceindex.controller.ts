import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { ServiceIndexService } from '../services/serviceindex.service'
import { Services } from '../../entities/Service.entity'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('services')
export class ServiceIndexController {
  constructor(private serviceIndexService: ServiceIndexService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async execute(@Req() req: Request): Promise<Services[]> {
    return await this.serviceIndexService.execute(req)
  }
}
