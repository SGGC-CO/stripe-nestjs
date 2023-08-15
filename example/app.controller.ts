import { Controller, Get, Post, Res } from '@nestjs/common';
import { AccountService } from '../src';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private accountService: AccountService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Post('account')
  async createAccount(@Res() res: Response) {
    const account = await this.accountService.createAccount('info@example.com');
    res.json(account);
  }
}
