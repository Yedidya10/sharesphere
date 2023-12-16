import crypto from 'crypto'
import getParams from './transloaditParams'

type Props = {
  authKey: string
  authSecret: string
  expires: string
  templateId: string
}

const createSignature = (props: Props) => {
  const { authKey, authSecret, expires, templateId } = props

  const params = getParams({ authKey, expires, templateId })

  const signatureBytes = crypto
    .createHmac('sha384', authSecret)
    .update(Buffer.from(params, 'utf-8'))
  // The final signature needs the hash name in front, so
  // the hashing algorithm can be updated in a backwards-compatible
  // way when old algorithms become insecure.
  const signature = `sha384:${signatureBytes.digest('hex')}`
  return signature
}

export default createSignature
