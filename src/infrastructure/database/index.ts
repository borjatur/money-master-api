import { connect, disconnect, type Mongoose } from 'mongoose'

export const init = async (url: string): Promise<Mongoose> => {
  return await connect(url)
}

export const closeDbConnection = async (): Promise<void> => {
  return await disconnect()
}
