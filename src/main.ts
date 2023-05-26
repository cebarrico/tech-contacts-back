import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('KenzieContacts')
    .setDescription('Api de contatos para os usuários.')
    .addTag('users')
    .addTag('contacts')
    .addTag('email')
    .addTag('phone')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transforms'] },
    }),
  );

  app.enableCors();
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
