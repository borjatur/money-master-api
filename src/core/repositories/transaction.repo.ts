import { type ITransaction } from '@core/entities/transaction'
import { type ITransactionPayload } from '@core/entities/transaction.payload'
import { type IPagination } from '@core/repositories/common.repo'

export interface ITransactionFilterCriteria {
  start?: Date
  end?: Date
  pagination?: IPagination
}

export interface ITransactionRepository {
  createTransaction: (transactionPayload: ITransactionPayload) => Promise<ITransaction>
  getTransaction: (id: string) => Promise<ITransaction | undefined>
  browseTransactions: (filterCriteria?: ITransactionFilterCriteria) => Promise<ITransaction[]>
  putTransaction: (id: string, transactionPayload: ITransactionPayload) => Promise<ITransaction | undefined>
  deleteTransaction: (id: string) => Promise<void>
}
