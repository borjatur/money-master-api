import { type IAccount } from '@core/entities/account'

export interface IAccountPayload extends Omit<IAccount, 'id'> {}
