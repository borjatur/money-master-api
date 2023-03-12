import { type IAccount } from '@core/entities/account'
import { type IAccountPayload } from '@core/entities/account.payload'

export interface IAccountRepository {
  createAccount: (accountPayload: IAccountPayload) => Promise<IAccount>
  getAccount: (id: string) => Promise<IAccount | undefined>
  browseAccounts: () => Promise<IAccount[]>
  putAccount: (id: string, accountPayload: IAccountPayload) => Promise<IAccount | undefined>
  deleteAccount: (id: string) => Promise<void>
}
