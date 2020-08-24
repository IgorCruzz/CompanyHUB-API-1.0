import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common'
import { ProductUpdateController } from './controllers/productupdate.controller'
import { ProductIndexController } from './controllers/productindex.controller'
import { ProductDeleteController } from './controllers/productdelete.controller'
import { ProductCreateController } from './controllers/productcreate.controller'
import { ProductUpdateService } from './services/productupdate.service'
import { ProductIndexService } from './services/productindex.service'
import { ProductCreateService } from './services/productcreate.service'
import { ProductDeleteService } from './services/productdelete.service'
import { Products } from '../entities/Product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductCreateMiddleware } from './validators/productCreate.middleware'
import { ProductUpdateMiddleware } from './validators/productUpdate.middleware'
import { UserModule } from '../user/user.module'
import { CompanyModule } from '../company/company.module'
import { ProductShowController } from './controllers/productshow.controller'
import { ProductShowService } from './services/productshow.service'

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CompanyModule),
    TypeOrmModule.forFeature([Products]),
  ],
  controllers: [
    ProductShowController,
    ProductIndexController,
    ProductCreateController,
    ProductDeleteController,
    ProductIndexController,
    ProductUpdateController,
  ],
  providers: [
    ProductShowService,
    ProductCreateService,
    ProductDeleteService,
    ProductIndexService,
    ProductUpdateService,
  ],
  exports: [TypeOrmModule],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductCreateMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST })
      .apply(ProductUpdateMiddleware)
      .forRoutes({ path: 'products/:id', method: RequestMethod.PUT })
  }
}
