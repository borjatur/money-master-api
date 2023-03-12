import { type IAccount } from '@core/entities/account'
import { type IAccountPayload } from '@core/entities/account.payload'
import { type IAccountRepository } from '@core/repositories/account.repo'
import { accountDAO } from '@infrastructure/database/account/account.dao'

export class AccountRepository implements IAccountRepository {
  async createAccount (accountPayload: IAccountPayload): Promise<IAccount> {
    return await accountDAO.create(accountPayload)
  }

  async getAccount (id: string): Promise<IAccount | undefined> {
    const account = await accountDAO.findById(id)
    if (account) {
      return account
    }
  }

  async browseAccounts (): Promise<IAccount[]> {
    const accounts = await accountDAO.find().sort({ _id: -1 }).limit(100)
    if (accounts) {
      return accounts
    }
    return []
  }

  async putAccount (id: string, accountPayload: IAccountPayload): Promise<IAccount | undefined> {
    const account = await accountDAO.findByIdAndUpdate(id, accountPayload, { new: true })
    if (account) {
      return account
    }
  }

  async deleteAccount (id: string): Promise<void> {
    await accountDAO.findByIdAndDelete(id)
  }
}
