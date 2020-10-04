import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const PORT = process.env.PORT || 8080
  const HOST = '0.0.0.0'
  // PORT
  await app.listen(PORT, HOST)
}
bootstrap()
