import { Schema } from 'mongoose'
import { TransactionType } from '@core/entities/transaction'
import { Currency } from '@core/entities/currency'

export const transactionSchema = new Schema({
  type: { type: String, enum: TransactionType, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  destinationAccountId: { type: Schema.Types.ObjectId, ref: 'Account', required: false },
  currency: { type: String, enum: Currency, default: Currency.EUR, required: true },
  amount: { type: Number, required: true },
  valuedAt: { type: Date, required: true }
}, {
  timestamps: true,
  versionKey: false,
  id: true,
  toJSON: {
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})
