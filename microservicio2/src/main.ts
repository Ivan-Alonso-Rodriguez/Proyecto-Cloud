import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Prefijo api
  app.setGlobalPrefix('api');
  
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina campos no definidos en DTOs
    forbidNonWhitelisted: true, // lanza error si hay campos extra
    transform: true, // transforma payloads al tipo esperado
  }));

  const config = new DocumentBuilder()
    .setTitle('Consultas API')
    .setDescription('API para consultas médicas veterinarias')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
