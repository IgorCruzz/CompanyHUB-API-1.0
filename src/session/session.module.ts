import {
  Module,
  forwardRef,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common'
import { SessionCreateController } from './controllers/sessioncreate.controller'
import { SessionService } from './services/session.service'
import { UserModule } from '../user/user.module'
import { SessionCreateMiddleware } from './validators/sessionCreate.middleware'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../jwt/constants'
import { JwtStrategy } from '../jwt/jwt.strategy'

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SessionCreateController],
  providers: [SessionService, JwtStrategy],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionCreateMiddleware)
      .forRoutes({ path: 'session', method: RequestMethod.POST })
  }
}
