import { Schema } from 'mongoose'
import { AccounType } from '@core/entities/account'
import { Currency } from '@core/entities/currency'

export const accountSchema = new Schema({
  accountType: {
    type: String,
    enum: AccounType,
    required: true
  },
  name: { type: String, required: true },
  iban: { type: String, required: false },
  balance: { type: Number, required: true },
  currency: {
    type: String,
    enum: Currency,
    default: Currency.EUR,
    required: true
  }
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
