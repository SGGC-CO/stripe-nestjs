import { Controller, Get, Inject } from '@nestjs/common';
import { STRIPE_CLIENT, Stripe } from '../../src';

@Controller('other')
export class OtherController {
  constructor(@Inject(STRIPE_CLIENT) private client: Stripe) {}
  @Get()
  getHello(): string {
    return 'Hello World from other module!';
  }
}
