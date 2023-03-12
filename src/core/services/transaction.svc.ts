import { type ITransaction } from '@core/entities/transaction'
import { type ITransactionPayload } from '@core/entities/transaction.payload'
import { type ITransactionRepository, type ITransactionFilterCriteria } from '@core/repositories/transaction.repo'
import { validateTransaction } from '@core/validations/transaction.val'

interface ITransactionService {
  createTransaction: (transactionPayload: ITransactionPayload) => Promise<ITransaction>
  getTransaction: (id: string) => Promise<ITransaction | undefined>
  browseTransactions: (filterCriteria: ITransactionFilterCriteria) => Promise<ITransaction[]>
  putTransaction: (id: string, transactionPayload: ITransactionPayload) => Promise<ITransaction | undefined>
  deleteTransaction: (id: string) => Promise<void>
}

export const transactionService = (
  transactionRepository: ITransactionRepository
): ITransactionService => ({
  createTransaction: async (transactionPayload: ITransactionPayload): Promise<ITransaction> => {
    validateTransaction(transactionPayload)
    return await transactionRepository.createTransaction(transactionPayload)
  },
  getTransaction: async (id: string): Promise<ITransaction | undefined> => {
    return await transactionRepository.getTransaction(id)
  },
  browseTransactions: async (filterCriteria: ITransactionFilterCriteria): Promise<ITransaction[]> => {
    return await transactionRepository.browseTransactions(filterCriteria)
  },
  putTransaction: async (id: string, transactionPayload: ITransactionPayload): Promise<ITransaction | undefined> => {
    validateTransaction(transactionPayload)
    return await transactionRepository.putTransaction(id, transactionPayload)
  },
  deleteTransaction: async (id: string): Promise<void> => {
    await transactionRepository.deleteTransaction(id)
  }
})
