import { type ITransaction } from '@core/entities/transaction'
import { type ITransactionPayload } from '@core/entities/transaction.payload'
import {
  type ITransactionRepository,
  type ITransactionFilterCriteria
} from '@core/repositories/transaction.repo'
import { transactionDAO } from '@infrastructure/database/transaction/transaction.dao'
import { type FilterQuery } from 'mongoose'

export class TransactionRepository implements ITransactionRepository {
  async createTransaction (transactionPayload: ITransactionPayload): Promise<ITransaction> {
    return await transactionDAO.create(transactionPayload)
  }

  async getTransaction (id: string): Promise<ITransaction | undefined> {
    const transaction = await transactionDAO.findById(id)
    if (transaction) {
      return transaction
    }
  }

  async putTransaction (id: string, transactionPayload: ITransactionPayload): Promise<ITransaction | undefined> {
    const transaction = await transactionDAO.findByIdAndUpdate(id, transactionPayload, { new: true })
    if (transaction) {
      return transaction
    }
  }

  async deleteTransaction (id: string): Promise<void> {
    await transactionDAO.findByIdAndDelete(id)
  }

  async browseTransactions (filterCriteria?: ITransactionFilterCriteria): Promise<ITransaction[]> {
    const criteria: FilterQuery<ITransaction> = {}
    if (filterCriteria?.pagination?.next) {
      criteria._id = { $lt: filterCriteria?.pagination?.next }
    } else if (filterCriteria?.pagination?.prev) {
      criteria._id = { $gt: filterCriteria?.pagination?.prev }
    }
    if (filterCriteria?.start && filterCriteria?.end) {
      criteria.valuedAt = {
        $get: filterCriteria?.start,
        $lt: filterCriteria?.end
      }
    }
    return await transactionDAO.find(criteria).sort({ _id: -1 }).limit(100)
  }
}
