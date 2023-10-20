import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
