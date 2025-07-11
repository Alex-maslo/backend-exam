import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Глобальна валідація
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // автоматично видаляє зайві поля
      forbidNonWhitelisted: true, // помилка, якщо є зайві поля
      transform: true, // перетворює типи (наприклад, рядки в числа)
      forbidUnknownValues: true, // ⬅️ важливо: не дозволяє передавати undefined/null як DTO
    }),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Listening on port ${port}`);
}

void bootstrap();
