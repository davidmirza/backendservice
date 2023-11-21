import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('David Mirza')
  .setDescription('BackEnd with nestjs, MongoDB')
  .setVersion('1.0')
  .addTag('List API')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('Documentation', app, document);

  const mcr = await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://cuvywbps:i8Yy1x8CE1iETE0twLgd1xVFLSvNCgUd@mustang.rmq.cloudamqp.com/cuvywbps'
      ],
      queue: 'msg-app',
      noAck: false,
      prefetchCount: 1
    }
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
