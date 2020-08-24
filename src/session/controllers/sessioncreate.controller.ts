import { Controller, Post, Req } from '@nestjs/common'
import { SessionService } from '../services/session.service'
import { ILoginSuccessDTO } from '../session.dto'
import { Request } from 'express'

@Controller('session')
export class SessionCreateController {
  constructor(private sessionService: SessionService) {}

  @Post()
  async execute(@Req() req: Request): Promise<ILoginSuccessDTO> {
    return await this.sessionService.execute(req)
  }
}
