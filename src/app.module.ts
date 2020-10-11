import 'dotenv/config'
import { TokenModule } from './token/token.module'
import { Connection } from 'typeorm'
import { SessionModule } from './session/session.module'
import { ProductModule } from './product/product.module'
import { ServicesModule } from './services/services.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyModule } from './company/company.module'
import { UserModule } from './user/user.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forRoot(),
    SessionModule,
    ProductModule,
    ServicesModule,
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
