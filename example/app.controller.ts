import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { AccountService, STRIPE_CLIENT } from '../src';
import { Response } from 'express';
import Stripe from '../src/stripe';

@Controller()
export class AppController {
  constructor(
    private accountService: AccountService,
    @Inject(STRIPE_CLIENT) private client: Stripe,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Post('account')
  async createAccount(@Res() res: Response) {
    // this way
    // await this.client.accounts.create({})
    // or this way
    const account = await this.accountService.createAccount('info@example.com');
    res.json(account);
  }
}
