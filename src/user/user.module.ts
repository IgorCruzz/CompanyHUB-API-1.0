import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserCreateController } from './controllers/usercreate.controller'
import { UserUpdateService } from './services/userupdate.service'
import { UserDeleteService } from './services/userdelete.service'
import { UserCreateService } from './services/usercreate.service'
import { UserDeleteController } from './controllers/userdelete.controller'
import { UserUpdateController } from './controllers/userupdate.controller'
import { Users } from '../entities/User.entity'
import { UseCreateMiddleware } from './validators/userCreate.middleware'
import { TokenModule } from '../token/token.module'
import { UseUpdateMiddleware } from './validators/userUpdate.middleware'

@Module({
  imports: [forwardRef(() => TokenModule), TypeOrmModule.forFeature([Users])],
  controllers: [
    UserCreateController,
    UserDeleteController,
    UserUpdateController,
  ],
  providers: [UserUpdateService, UserDeleteService, UserCreateService],
  exports: [TypeOrmModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UseCreateMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
      .apply(UseUpdateMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.PUT })
  }
}
