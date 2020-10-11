import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class AppController {
  @Get()
  async execute(): Promise<any> {
    return { app: 'Companyhub' }
  }
}
