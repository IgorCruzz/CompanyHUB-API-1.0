import { Controller, Delete, UseGuards, Req } from '@nestjs/common'
import { UserDeleteService } from '../services/userdelete.service'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'
import { DeleteResult } from 'typeorm'

@Controller('users')
export class UserDeleteController {
  constructor(private userDeleteService: UserDeleteService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async execute(@Req() req: Request): Promise<DeleteResult> {
    return await this.userDeleteService.execute(req)
  }
}
