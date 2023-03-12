import { type Currency } from '@core/entities/currency'

export enum AccounType {
  BANK = 'bank',
  CASH = 'cash'
}

export interface IAccount {
  id: string
  accountType: AccounType
  name: string
  iban?: string
  balance: number
  currency: Currency
  createdAt: string
  updatedAt: string
};
