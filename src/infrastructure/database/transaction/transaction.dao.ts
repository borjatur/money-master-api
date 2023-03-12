import { model } from 'mongoose'
import { transactionSchema } from '@infrastructure/database/transaction/transaction.schema'
import { type ITransaction } from '@core/entities/transaction'

export const transactionDAO = model<ITransaction>('Transaction', transactionSchema)
