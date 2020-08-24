import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common'
import { CompanyCreateController } from './controllers/companycreate.controller'
import { CompanyDeleteController } from './controllers/companydelete.controller'
import { CompanyIndexController } from './controllers/companyindex.controller'
import { CompanyUpdateController } from './controllers/companyupdate.controller'
import { CompanyUpdateService } from './services/companyupdate.service'
import { CompanyCreateService } from './services/companycreate.service'
import { CompanyDeleteService } from './services/companydelete.service'
import { CompanyIndexService } from './services/companyindex.service'
import { Companies } from '../entities/Company.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyCreateMiddleware } from './validators/companyCreate.middleware'
import { CompanyUpdateMiddleware } from './validators/companyUpdate.middleware'
import { UserModule } from '../user/user.module'
import { CompanyShowController } from './controllers/companyshow.controller'
import { CompanyShowService } from './services/companyshow.service'

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Companies]),
  ],
  controllers: [
    CompanyShowController,
    CompanyCreateController,
    CompanyDeleteController,
    CompanyIndexController,
    CompanyUpdateController,
  ],
  providers: [
    CompanyShowService,
    CompanyCreateService,
    CompanyDeleteService,
    CompanyIndexService,
    CompanyUpdateService,
  ],
  exports: [TypeOrmModule],
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompanyCreateMiddleware)
      .forRoutes({ path: 'companies', method: RequestMethod.POST })
      .apply(CompanyUpdateMiddleware)
      .forRoutes({ path: 'companies/:id', method: RequestMethod.PUT })
  }
}
