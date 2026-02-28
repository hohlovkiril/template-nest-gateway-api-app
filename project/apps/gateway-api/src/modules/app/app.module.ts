import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@libs/config';
import { AppController } from './controllers';
import { AuthorizationModule } from '@libs/authorization';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    AuthorizationModule,
  ],
  controllers: [
    AppController,
  ]
})
export class AppModule {}
