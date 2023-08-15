import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { StripeAsyncOptions, StripeOptions, getStripeClient } from './stripe.options';
import { STRIPE_CLIENT } from './stripe.symbol';
import { AccountService, ConnectService, PaymentService } from './services';

@Module({})
export class StripeModule {
  static forRoot(stripeOpts: StripeOptions) {
    const stripeClientProvider = {
      provide: STRIPE_CLIENT,
      useFactory: () => {
        return getStripeClient(stripeOpts);
      },
    };
    return {
      module: StripeModule,
      providers: [stripeClientProvider, AccountService, ConnectService, PaymentService],
      exports: [stripeClientProvider, AccountService, ConnectService, PaymentService],
    };
  }
  static forRootAsync(options: StripeAsyncOptions): DynamicModule {
    const stripeProvider: Provider = {
      inject: options.inject,
      provide: STRIPE_CLIENT,
      useFactory: async (args) => {
        const stripeOptions: StripeOptions = await options.createOptions(args);
        return getStripeClient(stripeOptions);
      },
    };

    return {
      module: StripeModule,
      exports: [stripeProvider, AccountService, ConnectService, PaymentService],
      providers: [stripeProvider, AccountService, ConnectService, PaymentService],
    };
  }
}
