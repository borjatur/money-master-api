import { TransactionType } from '@core/entities/transaction'
import { type ITransactionPayload } from '@core/entities/transaction.payload'
import { ValidationError } from '@core/errors'

export const validateTransaction = (transaction: ITransactionPayload): boolean | ValidationError => {
  if (transaction.type === TransactionType.TRANSFER &&
      !transaction.destinationAccountId) {
    throw new ValidationError('destinationAccountId must be provided when transaction is of type transfer')
  }
  return true
}
