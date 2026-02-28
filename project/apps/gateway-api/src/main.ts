import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { config } from 'dotenv';
import { AppModule } from './modules/app/app.module';
import { join } from 'path';

config({
  path: [
    join(process.cwd(), '..', 'env', 'env.local'),
    join(
      process.cwd(),
      '..',
      'env',
      `env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`,
    ),
  ],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Gateway-Api',
    }),
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.GATEWAY_API_PORT ?? 3000, () => {
    console.log(
      `Gateway-Api started on - http://${process.env.GATEWAY_API_HOST}:${process.env.GATEWAY_API_PORT}`,
    );
  });
}

void bootstrap();
