import { type ITransaction } from '@core/entities/transaction'

export interface ITransactionPayload extends Omit<ITransaction, 'id'> {}
