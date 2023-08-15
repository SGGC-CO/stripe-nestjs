import { Stripe } from './stripe';

export interface StripeOptions extends Stripe.StripeConfig {
  readonly apiKey: string;
}

export type StripeOptionsFactory = (...args: any[]) => Promise<StripeOptions> | StripeOptions;

export interface StripeAsyncOptions {
  inject: any[];
  createOptions: StripeOptionsFactory;
}

export function getStripeClient({ apiKey, appInfo, ...options }: StripeOptions): Stripe {
  const stripeClient = new Stripe(apiKey, {
    appInfo,
    ...options,
  });

  return stripeClient;
}
