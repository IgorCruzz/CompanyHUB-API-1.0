import { Controller, Post, UseGuards, Req } from '@nestjs/common'
import { ServiceCreateService } from '../services/servicecreate.service'
import { Services } from '../../entities/Service.entity'
import { Request } from 'express'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'

@Controller('services')
export class ServiceCreateController {
  constructor(private serviceCreateService: ServiceCreateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async execute(@Req() req: Request): Promise<Services> {
    return await this.serviceCreateService.execute(req)
  }
}
