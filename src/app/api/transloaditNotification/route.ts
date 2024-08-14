// Import the Next.js server functions for handling requests and responses
// import { NextRequest, NextResponse } from 'next/server'
// import { IncomingForm } from 'formidable'
// import crypto from 'crypto'
// import { IncomingMessage, ServerResponse } from 'http'
// import formidable from 'formidable'

// const checkSignature = (fields: formidable.Fields, authSecret: string) => {
//   const receivedSignature = fields.signature
//   const payload = fields.transloadit

//   // If the signature contains a colon, we expect it to be of format `algo:actual_signature`.
//   // If there are no colons, we assume it's a legacy signature using SHA-1.
//   const algoSeparatorIndex = receivedSignature.indexOf(':')
//   const algo =
//     algoSeparatorIndex === -1
//       ? 'sha1'
//       : receivedSignature.slice(0, algoSeparatorIndex)

//   try {
//     const calculatedSignature = crypto
//       .createHmac(algo, authSecret)
//       .update(Buffer.from(payload, 'utf-8'))
//       .digest('hex')

//     // If we are in legacy signature mode, algoSeparatorIndex is -1 and we are
//     // comparing the whole string. Otherwise we slice out the prefixed algo.
//     return (
//       calculatedSignature === receivedSignature.slice(algoSeparatorIndex + 1)
//     )
//   } catch {
//     // We can assume the signature string was ill-formed.
//     return false
//   }
// }

// const respond = (res: NextResponse, code: number, messages?: string[]) => {
//   if (code !== 200) {
//     console.error({ messages, code })
//   }

//   res.status(code).setHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
//   })

//   if (messages) {
//     res.write(JSON.stringify({ messages }))
//   }

//   res.end()
// }

// const getNotification = async (req: NextRequest, res: NextResponse) => {
//   if (req.method === 'OPTIONS') {
//     return respond(res, 204)
//   }

//   if (req.method === 'POST') {
//     const form = new IncomingForm()
//     form.parse(req, (err, fields) => {
//       if (err) {
//         console.error('Error while parsing multipart form', err)
//         NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//         return
//       }

//       // Verify Transloadit signature here
//       const receivedSignature = fields.signature
//       const payload = fields.transloadit
//       const authSecret = process.env.AUTH_SECRET // Replace with your actual secret

//       // Verify the signature (you can use your existing checkSignature function)
//       if (!checkSignature(fields, authSecret)) {
//         console.error('Error while checking signatures')
//         res.status(403).json({ error: 'Forbidden' })
//         return
//       }

//       // Parse the Transloadit payload
//       let assembly = {}
//       try {
//         assembly = JSON.parse(fields.transloadit)
//       } catch (err) {
//         console.error('Error while parsing transloadit field', err)
//         res.status(500).json({ error: 'Internal Server Error' })
//         return
//       }

//       // Process the assembly data here
//      

//       // Respond with a success message
//       res.status(200).json({ message: 'Success!' })
//     })
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' })
//   }
// }

// export default getNotification

// export default async function handler(req: NextRequest) {
//   if (req.method === 'GET') {
//     try {
//       // Parse the JSON data from the Transloadit notification
//       const notificationData = req.body

//       // Process the notification data (e.g., update your database, send notifications, etc.)
//       console.log('Transloadit Notification Data:', notificationData)

//       // Respond with a success status code (e.g., 200 OK)
//       NextResponse.json(
//         { success: true }, { status: 200 })
//     } catch (error) {
//       console.error('Error processing Transloadit notification:', error)
//       NextResponse.json(
//         {
//           success: false,

//           error: 'Internal Server Error',
//         },
//         { status: 500 }
//       )
//     }
//   } else {
//     // Respond with an error for unsupported HTTP methods
//     NextResponse.json(
//       { success: false, error: 'Method Not Allowed' },
//       { status: 405 }
//     )
//   }
// }
