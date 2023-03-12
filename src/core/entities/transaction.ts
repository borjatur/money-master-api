import { type Currency } from '@core/entities/currency'

export enum TransactionType {
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
  INCOME = 'income'
}

export interface ITransaction {
  id: string
  type: TransactionType
  description: string
  tags: string[]
  accountId: string
  destinationAccountId?: string
  currency: Currency
  amount: number
  createdAt: string
  updatedAt: string
  valuedAt: string
};
