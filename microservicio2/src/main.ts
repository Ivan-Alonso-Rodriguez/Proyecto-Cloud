import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Consultas API')
    .setDescription('API para consultas médicas veterinarias')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use('/swagger-json', (req, res) => res.send(document)); // <- JSON endpoint

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      url: '/swagger-json',
      explorer: true,
    },
    customSiteTitle: 'Consultas API - Swagger',
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ]
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
