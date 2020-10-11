import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class AppController {
  @Get()
  execute(): any {
    return { app: 'Companyhub' }
  }
}
