import { Controller, Put, UseGuards, Req } from '@nestjs/common'
import { UserUpdateService } from '../services/userupdate.service'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { Request } from 'express'
import { UpdateResult } from 'typeorm'

@Controller('users')
export class UserUpdateController {
  constructor(private userUpdateService: UserUpdateService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return await this.userUpdateService.execute(req)
  }
}
