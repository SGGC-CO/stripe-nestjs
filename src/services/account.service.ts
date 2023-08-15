import { Inject, Injectable } from '@nestjs/common';
import { STRIPE_CLIENT } from '../stripe.symbol';
import Stripe from 'stripe';

export type StripeAccountType = 'express' | 'standard' | 'custom';

@Injectable()
export class AccountService {
  constructor(@Inject(STRIPE_CLIENT) private client: Stripe) {}

  // describe the createAccount function
  /**
   * Creates a Stripe account
   * @param email - The email address of the account
   * @param opts - Optional parameters
   * @param opts.type - The type of account to create (express, standard, custom)
   * @param opts.country - The country of the account (ISO 3166-1 alpha-2)
   * @returns The created account
   * @throws Throws an error if the account could not be created
   * @example
   * const account = await createAccount("ex@example.com", {country: "US"});
   * console.log(account.id);
   * // acct_1J2j3k4l5m6n7o8p
   */
  async createAccount(email: string, opts?: { type: StripeAccountType; country: string }): Promise<Stripe.Account> {
    const accountType = opts?.type || 'express';
    const country = opts?.country || 'GB';
    const account = await this.client.accounts.create({
      type: accountType,
      email,
      country,
    });

    return account;
  }
  /**
   * Retrieves a Stripe account
   * @param id - The id of the account to retrieve
   * @returns The retrieved account
   * @throws Throws an error if the account could not be retrieved
   */
  async retrieveAccount(id: string): Promise<Stripe.Account> {
    const account = await this.client.accounts.retrieve(id);
    return account;
  }
  /**
   * Updates a Stripe account
   *  @param id - The id of the account to update
   * @param data - The data to update the account with
   * @returns The updated account
   * @throws Throws an error if the account could not be updated
   */
  async updateAccount(id: string, data: Stripe.AccountUpdateParams) {
    const account = await this.client.accounts.update(id, data);
    return account;
  }
  /**
   * Deletes a Stripe account
   * @param id - The id of the account to delete
   * @returns The deleted account
   * @throws Throws an error if the account could not be deleted
   */
  async deleteAccount(id: string) {
    const deleted = await this.client.accounts.del(id);
    return deleted;
  }
  /**
   * Lists Stripe accounts
   * @returns The list of accounts
   * @throws Throws an error if the accounts could not be listed
   */
  async listAccounts() {
    const accounts = await this.client.accounts.list();
    return accounts;
  }
  /**
   * Reject a Stripe account
   * @param id - The id of the account to accept
   * @returns The accepted account
   * @throws Throws an error if the account could not be accepted
   */
  async rejectAccount(id: string, reason: string) {
    const rejected = await this.client.accounts.reject(id, { reason });
    return rejected;
  }
  /**
   * Create login link a Stripe account
   * @param id - The id of the account to reject
   *  @returns The login link
   * @throws Throws an error if the account could not be rejected
   */
  async createLoginLink(id: string) {
    const link = await this.client.accounts.createLoginLink(id);
    return link;
  }
}
