import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const PORT = process.env.PORT
  const HOST = '0.0.0.0'

  await app.listen(HOST, PORT)
}
bootstrap()
