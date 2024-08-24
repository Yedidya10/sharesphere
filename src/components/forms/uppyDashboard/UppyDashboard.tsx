'use client'

import createUppy from '@/components/uppy/createUppy'
import themeModeState from '@/recoils/themeMode/themeModeState'
import { IAddItemFormValues } from '@/utils/types/formValues'
import TextField from '@mui/material/TextField'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { Dashboard } from '@uppy/react'
import '@uppy/url/dist/style.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form'
import { useRecoilValue } from 'recoil'

export interface IUppyDashboard {
  control: Control<IAddItemFormValues, any>
  getValues?: UseFormGetValues<IAddItemFormValues>
  setValue?: UseFormSetValue<IAddItemFormValues>
  templateId: string
  authKey: string
  authSecret: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the UppyDashboard be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * UppyDashboard contents
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const UppyDashboard: React.FC<IUppyDashboard> = ({
  control,
  getValues,
  setValue,
  templateId,
  authKey,
  authSecret,
  ...props
}) => {
  const themeMode = useRecoilValue(themeModeState)
  const houseId = 'mainHouse'
  const roomId = 'mainRoom'
  const [uppy] = useState(() =>
    createUppy({
      ids: {
        houseId,
        roomId,
      },
      authKey,
      authSecret,
      templateId,
    })
  )

  useEffect(() => {
    if (houseId && roomId) {
      uppy.setOptions({ meta: { houseId, roomId } })
    }
  }, [uppy, houseId, roomId])

  uppy.on('complete', (result) => {
  })

  uppy.on('error', (error) => {
    console.error(error)
  })

  return (
    <>
      <Dashboard
        uppy={uppy}
        plugins={[
          // 'Webcam',
          'Dropbox',
          'GoogleDrive',
          'Facebook',
          'OneDrive',
          'Box',
          'Url',
          // 'ImageEditor',
        ]}
        metaFields={[
          { id: 'name', name: 'Name', placeholder: 'Image name' },
          {
            id: 'caption',
            name: 'Caption',
            placeholder: 'Describe what the image is about',
          },
        ]}
        showLinkToFileUploadResult={false} // default: false. https://uppy.io/docs/dashboard/#showlinktofileuploadresult
        waitForThumbnailsBeforeUpload={true} // https://uppy.io/docs/dashboard/#waitforthumbnailsbeforeupload
        showSelectedFiles={true} // https://uppy.io/docs/dashboard/#showselectedfiles
        replaceTargetContent={true} // https://uppy.io/docs/dashboard/#replacetargetcontent
        showProgressDetails={false} // https://uppy.io/docs/dashboard/#showprogressdetails
        note="Images only, 1–4 files, up to 5 MB"
        height="350px" // default: 550. https://uppy.io/docs/dashboard/#height
        width="auto" // default: 750. https://uppy.io/docs/dashboard/#width
        proudlyDisplayPoweredByUppy={false} // ther is a bug with this option. is still shows the uppy logo on small screens // https://uppy.io/docs/dashboard/#proudlydisplaypoweredbyuppy
        theme={themeMode} // https://uppy.io/docs/dashboard/#theme
      />
      <Controller
        control={control}
        // @ts-ignore: Temporary until the actual implementation of this component
        name={'imagesFile'}
        rules={{
          required: 'Please upload at least one image',
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState,
        }) => (
          <TextField
            id={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            inputRef={ref}
            error={!!fieldState.error}
            sx={{ display: 'none' }}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
      />
    </>
  )
}

export default UppyDashboard
