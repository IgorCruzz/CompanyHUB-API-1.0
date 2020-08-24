import { Controller, Delete, UseGuards, Req } from '@nestjs/common'
import { ServiceDeleteService } from '../services/servicedelete.service'
import { DeleteResult } from 'typeorm'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'

@Controller('services')
export class ServiceDeleteController {
  constructor(private serviceDeleteService: ServiceDeleteService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async execute(@Req() req: Request): Promise<DeleteResult> {
    return await this.serviceDeleteService.execute(req)
  }
}
