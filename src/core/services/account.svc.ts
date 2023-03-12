import { type IAccount } from '@core/entities/account'
import { type IAccountPayload } from '@core/entities/account.payload'
import { type IAccountRepository } from '@core/repositories/account.repo'

interface AccountService {
  createAccount: (accountPayload: IAccountPayload) => Promise<IAccount>
  getAccount: (id: string) => Promise<IAccount | undefined>
  browseAccounts: () => Promise<IAccount[]>
  putAccount: (id: string, accountPayload: IAccountPayload) => Promise<IAccount | undefined>
  deleteAccount: (id: string) => Promise<void>
}

export const accountService = (
  accountRepository: IAccountRepository
): AccountService => ({
  createAccount: async (accountPayload: IAccountPayload): Promise<IAccount> => {
    return await accountRepository.createAccount(accountPayload)
  },
  getAccount: async (id: string): Promise<IAccount | undefined> => {
    return await accountRepository.getAccount(id)
  },
  browseAccounts: async (): Promise<IAccount[]> => {
    return await accountRepository.browseAccounts()
  },
  putAccount: async (id: string, accountPayload: IAccountPayload): Promise<IAccount | undefined> => {
    return await accountRepository.putAccount(id, accountPayload)
  },
  deleteAccount: async (id: string): Promise<void> => {
    await accountRepository.deleteAccount(id)
  }
})
