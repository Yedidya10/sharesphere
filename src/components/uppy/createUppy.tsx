import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import Url from '@uppy/url'
import GoogleDrive from '@uppy/google-drive'
import Facebook from '@uppy/facebook'
import OneDrive from '@uppy/onedrive'
import Dropbox from '@uppy/dropbox'
import Box from '@uppy/box'
import ImageEditor from '@uppy/image-editor'
// @ts-ignore
import Hebrew from '@uppy/locales/lib/he_IL'
import Transloadit, { COMPANION_URL } from '@uppy/transloadit'
import expires from './dateString'
import createSignature from './transloaditSignature'

type CreateUppy = {
  ids: {
    houseId: string
    roomId: string
  }
  authKey: string
  authSecret: string
  templateId: string
}

const createUppy = (props: CreateUppy) => {
  const { ids, authKey, authSecret, templateId } = props
  const { houseId, roomId } = ids

  if (!authKey || !authSecret) {
    throw new Error('Missing auth key or secret')
  }

  const signature = createSignature({
    authKey,
    authSecret,
    expires,
    templateId,
  })

  // Adding to global `meta` will add it to every file.
  // Every Uppy instance needs a unique ID.
  return new Uppy({
    id: roomId,
    meta: { houseId, roomId },

    locale: Hebrew,
    autoProceed: false,
    restrictions: {
      allowedFileTypes: ['image/*'],
      maxNumberOfFiles: 4,
      minNumberOfFiles: 1,
      minFileSize: 1000,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
    },
  })
    .use(Transloadit, {
      // Import files from Companion using the /import-files Robot
      // importFromUploadURLs: true,
      assemblyOptions(file: any) {
        return {
          params: {
            auth: { key: authKey, expires },
            template_id: templateId,
            // Send the results of the assembly to your backend.
            notify_url: 'http://127.0.0.1:3000/api/transloaditNotification',
          },
          signature,
          // You can use these inside your template
          // https://transloadit.com/docs/topics/assembly-instructions/#form-fields-in-instructions
          fields: { roomId: file.meta.roomId, houseId: file.meta.houseId },
          waitForEncoding: false, // See https://transloadit.com/docs/topics/assembly-notifications/
        }
      },
    })
    .use(Compressor)
    .use(Url, { companionUrl: COMPANION_URL })
    .use(GoogleDrive, { companionUrl: COMPANION_URL })
    .use(Facebook, { companionUrl: COMPANION_URL })
    .use(OneDrive, { companionUrl: COMPANION_URL })
    .use(Dropbox, { companionUrl: COMPANION_URL })
    .use(Box, { companionUrl: COMPANION_URL })
  // .use(ImageEditor, {
  //   actions: {
  //     granularRotate: true,
  //     revert: true,
  //     rotate: true,
  //     flip: true,
  //     zoomIn: true,
  //     zoomOut: true,
  //     cropSquare: true,
  //     cropWidescreen: true,
  //     cropWidescreenVertical: true,
  //   },
  // })
}

export default createUppy
