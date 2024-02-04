import payload from 'payload'

export const ensureCountersIndex = async (): Promise<void> => {
  const counters = payload?.db?.connection?.collection('counters')
  // It will be null during a Docker build
  if (counters != null) {
    await counters.createIndex({ name: 1 }, { unique: true })
  }
}

export const incrementCounter = async (name: string): Promise<number> => {
  const counters = payload.db.connection.collection('counters')

  const doc = await counters.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { upsert: true, returnDocument: 'after' }
  )

  return doc.value.value
}
