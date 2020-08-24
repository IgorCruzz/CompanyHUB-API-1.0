import { Controller, Put, Req } from '@nestjs/common'
import { UpdateResult } from 'typeorm'
import { TokenCreateService } from '../services/tokencreate.service'
import { Request } from 'express'

@Controller('auth')
export class TokenCreateController {
  constructor(private tokenCreateService: TokenCreateService) {}

  @Put(':token')
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return await this.tokenCreateService.execute(req)
  }
}
