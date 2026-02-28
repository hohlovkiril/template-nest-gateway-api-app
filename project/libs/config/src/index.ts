import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '..', 'env', 'env.local'),
        join(
          process.cwd(),
          '..',
          'env',
          `env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`,
        ),
      ],
    }),
  ],
})
export class ConfigModule {}
