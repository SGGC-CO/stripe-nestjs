import { Module } from '@nestjs/common';
import { OtherController } from './other.controller';
import { StripeModule } from '../../src';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OtherController],
  imports: [
    // if StripeModule is not global, you must do this
    // StripeModule.forRootAsync({
    //   isGlobal: true,
    //   inject: [ConfigService],
    //   createOptions: async (config: ConfigService) => {
    //     const apiKey = config.get<string>('STRIPE_API_KEY');
    //     if (!apiKey) {
    //       throw new Error('STRIPE_API_KEY is not defined');
    //     }
    //     const apiVersion = config.get('STRIPE_API_VERSION') || '2022-11-15';
    //     return {
    //       apiKey,
    //       apiVersion,
    //     };
    //   },
    // }),
  ],
})
export class OtherModule {}
