import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const config = app.get(ConfigService)
  const PORT = config.get('API_PORT')
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Books service')
  .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api', app, document)
  await app.listen(PORT, () => console.log(`Service is running on PORT ${PORT}`));
}
bootstrap();
