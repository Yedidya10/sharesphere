type Props = {
  authKey: string
  expires: string
  templateId: string
}

const getParams = (props: Props) => {
  const { authKey, expires, templateId } = props

  const params = JSON.stringify({
    auth: {
      key: authKey,
      expires,
    },
    template_id: templateId,
    notify_url: 'http://127.0.0.1:3000/api/transloadit',
  })

  return params
}

export default getParams
