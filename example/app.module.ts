import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from '../src/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'example/.env',
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      createOptions: async (config: ConfigService) => {
        const apiKey = config.get<string>('STRIPE_API_KEY');
        if (!apiKey) {
          throw new Error('STRIPE_API_KEY is not defined');
        }
        const apiVersion = config.get('STRIPE_API_VERSION') || '2022-11-15';
        return {
          apiKey,
          apiVersion,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
