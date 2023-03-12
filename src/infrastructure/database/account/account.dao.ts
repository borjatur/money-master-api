import { model } from 'mongoose'
import { accountSchema } from '@infrastructure/database/account/account.schema'
import { type IAccount } from '@core/entities/account'

export const accountDAO = model<IAccount>('Account', accountSchema)
