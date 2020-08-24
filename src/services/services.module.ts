import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common'
import { ServiceCreateService } from './services/servicecreate.service'
import { ServiceDeleteService } from './services/servicedelete.service'
import { ServiceIndexService } from './services/serviceindex.service'
import { ServiceUpdateService } from './services/serviceupdate.service'
import { ServiceCreateController } from './controllers/servicecreate.controller'
import { ServiceDeleteController } from './controllers/servicedelete.controller'
import { ServiceIndexController } from './controllers/serviceindex.controller'
import { ServiceUpdateController } from './controllers/serviceupdate.controller'
import { Services } from '../entities/Service.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceCreateMiddleware } from './validators/serviceCreate.middleware'
import { ServiceUpdateMiddleware } from './validators/serviceUpdate.middleware'
import { ProductModule } from '../product/product.module'
import { CompanyModule } from '../company/company.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    forwardRef(() => ProductModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Services]),
  ],
  controllers: [
    ServiceCreateController,
    ServiceDeleteController,
    ServiceIndexController,
    ServiceUpdateController,
  ],
  providers: [
    ServiceCreateService,
    ServiceDeleteService,
    ServiceIndexService,
    ServiceUpdateService,
  ],
})
export class ServicesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ServiceCreateMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST })
      .apply(ServiceUpdateMiddleware)
      .forRoutes({ path: 'products/:id', method: RequestMethod.PUT })
  }
}
