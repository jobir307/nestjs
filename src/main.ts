import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  app.useGlobalPipes(new ValidationPipe())


  const configSwagger = new DocumentBuilder()
    .setTitle('NestJS lesson API')
    .setDescription('This API for NestJS lesson')
    .setVersion('7.3.0')
    .addTag("API")
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)
  await app.listen(port)
}
bootstrap()
