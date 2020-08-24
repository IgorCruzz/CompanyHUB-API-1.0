import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TokenCreateController } from './controllers/tokencreate.controller'
import { TokenCreateService } from './services/tokencreate.service'
import { Tokens } from '../entities/Token.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Tokens])],
  controllers: [TokenCreateController],
  providers: [TokenCreateService],
  exports: [TypeOrmModule],
})
export class TokenModule {}
