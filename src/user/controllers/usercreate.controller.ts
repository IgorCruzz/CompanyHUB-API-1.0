import { Controller, Post, Req } from '@nestjs/common'
import { UserCreateService } from '../services/usercreate.service'
import { Request } from 'express'
import { Users } from 'src/entities/User.entity'

@Controller('users')
export class UserCreateController {
  constructor(private userCreateService: UserCreateService) {}

  @Post()
  async execute(@Req() req: Request): Promise<Users> {
    return await this.userCreateService.execute(req)
  }
}
