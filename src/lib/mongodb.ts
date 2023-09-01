import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

if (!process.env.MONGODB_URI_LOCAL && process.env.NODE_ENV === 'development') {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI_LOCAL"')
}

const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_URI_LOCAL
    : ''

const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri as string, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri as string, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
