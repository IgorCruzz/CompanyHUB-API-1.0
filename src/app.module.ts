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

@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migration/**/*.js'],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    SessionModule,
    ProductModule,
    ServicesModule,
    UserModule,
    CompanyModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
