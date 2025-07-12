/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Authorization,Content-Length,X-Requested-With,x-access-token',
    optionsSuccessStatus: 200,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
