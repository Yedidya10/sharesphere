import { NextApiRequest, NextApiResponse } from 'next'

import { MongoClient } from 'mongodb'

// Replace these with your MongoDB connection string and database name
const uri = process.env.MONGODB_URI!
const dbName = 'share_sphere'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  const { email } = req.body

  try {
    const client = await MongoClient.connect(uri)
    const db = client.db(dbName)

    const user = await db.collection('users').findOne({ email })

    client.close()

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // If user found, return the user data as JSON
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
