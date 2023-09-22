'use client'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Control, Controller } from 'react-hook-form'
import { RiDragDropLine } from 'react-icons/ri'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import Divider from '@mui/material/Divider'
import { AddItemFormValues } from '@/utils/types/FormValues'

export interface IImageInput {
  control: Control<AddItemFormValues, any>
  name: string
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the ImageInput be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * ImageInput contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

const ImageInput: React.FC<IImageInput> = ({
  control,
  name,
  label,
  ...props
}) => {
  const [imagesFile, setImagesFile] = useState<
    Array<File & { preview: string }>
  >([])
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null)

  // use react-dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Append the new files to the existing array
      setImagesFile((prevImagesFile) => [
        ...prevImagesFile,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ])
    },
    maxFiles: 4,
    maxSize: 5242880, // 5MB
    accept: {
      'image/*': [],
    },
    noClick: true,
  })

  const removeImage = (file: File & { preview: string }) => {
    const newImagesFile = imagesFile.filter(
      (imageFile) => imageFile.name !== file.name
    )
    setImagesFile(newImagesFile)
  }

  // Create a ref for the file input
  // const fileInputRef = useRef<HTMLInputElement | null>(null)

  // const addImage = (index: number) => {
  //   // Set the index of the image to be replaced
  //   setReplaceIndex(index)

  //   // Trigger the file input
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click()
  //   }
  // }

  // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0]
  //   if (selectedFile !== undefined && replaceIndex !== null) {
  //     // Create a new array of imagesFile with the replaced image
  //     const updatedImages = [...imagesFile]
  //     updatedImages[replaceIndex] = Object.assign(selectedFile, {
  //       preview: URL.createObjectURL(selectedFile),
  //     })
  //     setImagesFile(updatedImages)
  //     // Reset the replaceIndex
  //     setReplaceIndex(null)
  //   }
  // }

  useEffect(() => {
    console.log(imagesFile)
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => imagesFile.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [imagesFile])

  const uploadToGoogleCloudStorage = async (file: File) => {
    try {
      const uploadUrl = process.env.GOOGLE_CLOUD_STORAGE_BUCKET_URL
      const formData = new FormData()
      formData.append('file', file)

      await fetch(uploadUrl!, {
        method: 'POST',
        body: formData,
      })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: 'Please upload at least one image',
      }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState,
      }) => (
        <FormControl fullWidth required error={!!fieldState.error}>
          <Grid container columns={30} columnSpacing={1}>
            {imagesFile.map((file, index) => (
              <Grid key={file.name} md={7.5}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 1,
                    border: '1px solid #eaeaea',
                    width: '100%',
                    height: '200px',
                    '&:hover  > div': {
                      display: 'flex',
                      gap: 1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'none',
                      position: 'relative',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    <IconButton
                      sx={{
                        color: 'white',
                      }}
                      onClick={() => removeImage(file)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    {/* <IconButton
                      component="label"
                      sx={{
                        color: 'white',
                      }}
                      onClick={() => addImage(index)}
                    >
                      <DriveFolderUploadOutlinedIcon />
                      <Input
                        id={`file-input-${index}`}
                        name={`file-input-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                      />
                    </IconButton> */}
                  </Box>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              </Grid>
            ))}
            <Grid
              md={
                imagesFile && imagesFile.length === 0
                  ? 30
                  : imagesFile && imagesFile.length === 1
                  ? 22.5
                  : imagesFile && imagesFile.length === 2
                  ? 15
                  : 7.5
              }
            >
              {imagesFile && imagesFile.length >= 4 ? null : (
                <Button
                  fullWidth
                  component="label"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    border: '1px dashed',
                    height: '200px',
                    textTransform: 'none',
                  }}
                >
                  <Input
                    fullWidth
                    id={name}
                    name={name}
                    inputProps={{ ...getInputProps() }}
                    inputRef={ref}
                    value={value}
                    required
                    type={'file'}
                    style={{ display: 'none' }}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                  {isDragActive ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <RiDragDropLine size={20} />
                      <Typography sx={{ fontSize: '1rem' }}>
                        Drop the images here ...
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100px',
                            gap: 1,
                          }}
                        >
                          <RiDragDropLine size={20} />
                          <Typography sx={{ fontSize: '1rem' }}>
                            Drag and drop images
                          </Typography>
                        </Box>
                        <Divider sx={{ height: '100%' }} orientation="vertical">
                          OR
                        </Divider>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <DriveFolderUploadIcon />
                          <Typography sx={{ fontSize: '1rem' }}>
                            Click to select images
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: '0.8rem' }}>
                        Up to {4 - imagesFile.length} images, max 5MB each
                      </Typography>
                    </Box>
                  )}
                </Button>
              )}
            </Grid>
          </Grid>
          <FormHelperText>
            {(function () {
              if (fieldState.error) {
                return fieldState.error.message
              }
              if (!fieldState.isDirty) {
                return 'Please upload image'
              }
            })()}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default ImageInput






// 'use client'

// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import FormControl from '@mui/material/FormControl'
// import FormHelperText from '@mui/material/FormHelperText'
// import IconButton from '@mui/material/IconButton'
// import Input from '@mui/material/Input'
// import Typography from '@mui/material/Typography'
// import Grid from '@mui/material/Unstable_Grid2'
// import Image from 'next/image'
// import React, { useEffect, useState, useRef } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { Control, Controller, useFormContext } from 'react-hook-form'
// import { RiDragDropLine } from 'react-icons/ri'
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
// import Divider from '@mui/material/Divider'
// import { AddItemFormValues } from '@/utils/types/FormValues'

// export interface IImageInput {
//   control: Control<AddItemFormValues, any>
//   name: string
//   /**
//    * Is this the principal call to action on the page?
//    */
//   primary?: boolean
//   /**
//    * What background color to use
//    */
//   backgroundColor?: string
//   /**
//    * How large should the ImageInput be?
//    */
//   size?: 'small' | 'medium' | 'large'
//   /**
//    * ImageInput contents
//    */
//   label: string
//   /**
//    * Optional click handler
//    */
//   onClick?: () => void
// }

// const ImageInput: React.FC<IImageInput> = ({
//   control,
//   name,
//   label,
//   ...props
// }) => {
//   const [replaceIndex, setReplaceIndex] = useState<number | null>(null)
//   const { register, unregister, setValue, watch } = useFormContext()
//   const imagesFileWatch = watch(name)

//   // use react-dropzone hook
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       // Append the new files to the existing array
//       setValue(name, [...imagesFileWatch, ...acceptedFiles])
//     },
//     // onDrop: (acceptedFiles) => {
//     //   // Append the new files to the existing array
//     //   setImagesFile((prevImagesFile) => [
//     //     ...prevImagesFile,
//     //     ...acceptedFiles.map((file) =>
//     //       Object.assign(file, {
//     //         preview: URL.createObjectURL(file),
//     //       })
//     //     ),
//     //   ])
//     // },
//     maxFiles: 4,
//     maxSize: 5242880, // 5MB
//     accept: {
//       'image/*': [],
//     },
//     noClick: true,
//   })

//   const removeImage = (file: File) => {
//     // Remove the image from the array
//     setValue(
//       name,
//       imagesFileWatch.filter((image: File) => image.name !== file.name)
//     )
//   }

//   // Create a ref for the file input
//   // const fileInputRef = useRef<HTMLInputElement | null>(null)

//   // const addImage = (index: number) => {
//   //   // Set the index of the image to be replaced
//   //   setReplaceIndex(index)

//   //   // Trigger the file input
//   //   if (fileInputRef.current) {
//   //     fileInputRef.current.click()
//   //   }
//   // }

//   // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const selectedFile = e.target.files?.[0]
//   //   if (selectedFile !== undefined && replaceIndex !== null) {
//   //     // Create a new array of imagesFile with the replaced image
//   //     const updatedImages = [...imagesFile]
//   //     updatedImages[replaceIndex] = Object.assign(selectedFile, {
//   //       preview: URL.createObjectURL(selectedFile),
//   //     })
//   //     setImagesFile(updatedImages)
//   //     // Reset the replaceIndex
//   //     setReplaceIndex(null)
//   //   }
//   // }

//   useEffect(() => {
//     register(name)
//     return () => unregister(name)
//   }, [register, unregister, name])

//   const uploadToGoogleCloudStorage = async (file: File) => {
//     try {
//       const uploadUrl = process.env.GOOGLE_CLOUD_STORAGE_BUCKET_URL
//       const formData = new FormData()
//       formData.append('file', file)

//       await fetch(uploadUrl!, {
//         method: 'POST',
//         body: formData,
//       })
//     } catch (error) {
//       console.error('Error uploading image:', error)
//     }
//   }

//   return (
//     <Controller
//       control={control}
//       name={name}
//       rules={{
//         required: 'Please upload at least one image',
//       }}
//       render={({
//         field: { onChange, onBlur, value, name, ref },
//         fieldState,
//       }) => (
//         <FormControl fullWidth required error={!!fieldState.error}>
//           <Grid container columns={30} columnSpacing={1}>
//             {imagesFileWatch?.map((file: File) => (
//               <Grid key={file.name} md={7.5}>
//                 <Box
//                   sx={{
//                     position: 'relative',
//                     borderRadius: 1,
//                     border: '1px solid #eaeaea',
//                     width: '100%',
//                     height: '200px',
//                     '&:hover  > div': {
//                       display: 'flex',
//                       gap: 1,
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'none',
//                       position: 'relative',
//                       top: 0,
//                       left: 0,
//                       zIndex: 1,
//                       width: '100%',
//                       height: '100%',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       backgroundColor: 'rgba(0,0,0,0.4)',
//                     }}
//                   >
//                     <IconButton
//                       sx={{
//                         color: 'white',
//                       }}
//                       onClick={() => removeImage(file)}
//                     >
//                       <DeleteOutlineIcon />
//                     </IconButton>
//                     {/* <IconButton
//                       component="label"
//                       sx={{
//                         color: 'white',
//                       }}
//                       onClick={() => addImage(index)}
//                     >
//                       <DriveFolderUploadOutlinedIcon />
//                       <Input
//                         id={`file-input-${index}`}
//                         name={`file-input-${index}`}
//                         type="file"
//                         style={{ display: 'none' }}
//                         onChange={handleFileInputChange}
//                       />
//                     </IconButton> */}
//                   </Box>
//                   <Image
//                     src={URL.createObjectURL(file)}
//                     alt={file.name}
//                     fill
//                     style={{ objectFit: 'contain' }}
//                   />
//                 </Box>
//               </Grid>
//             ))}
//             <Grid
//               md={
//                 imagesFileWatch && imagesFileWatch.length >= 4
//                   ? 30
//                   : imagesFileWatch && imagesFileWatch.length >= 2
//                   ? 15
//                   : 7.5
//               }
//             >
//               {imagesFileWatch && imagesFileWatch.length >= 4 ? null : (
//                 <Button
//                   fullWidth
//                   component="label"
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: 1,
//                     border: '1px dashed',
//                     height: '200px',
//                     textTransform: 'none',
//                   }}
//                 >
//                   <Input
//                     fullWidth
//                     id={name}
//                     name={name}
//                     inputProps={{ ...getInputProps() }}
//                     inputRef={ref}
//                     value={value}
//                     required
//                     type={'file'}
//                     style={{ display: 'none' }}
//                     onChange={onChange}
//                     onBlur={onBlur}
//                   />
//                   {isDragActive ? (
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                       <RiDragDropLine size={20} />
//                       <Typography sx={{ fontSize: '1rem' }}>
//                         Drop the images here ...
//                       </Typography>
//                     </Box>
//                   ) : (
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         gap: 4,
//                       }}
//                     >
//                       <Box sx={{ display: 'flex', gap: 3 }}>
//                         <Box
//                           sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '100px',
//                             gap: 1,
//                           }}
//                         >
//                           <RiDragDropLine size={20} />
//                           <Typography sx={{ fontSize: '1rem' }}>
//                             Drag and drop images
//                           </Typography>
//                         </Box>
//                         <Divider sx={{ height: '100%' }} orientation="vertical">
//                           OR
//                         </Divider>
//                         <Box
//                           sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             gap: 1,
//                           }}
//                         >
//                           <DriveFolderUploadIcon />
//                           <Typography sx={{ fontSize: '1rem' }}>
//                             Click to select images
//                           </Typography>
//                         </Box>
//                       </Box>
//                       <Typography sx={{ fontSize: '0.8rem' }}>
//                         Up to {4 - imagesFileWatch?.length} images, max 5MB each
//                       </Typography>
//                     </Box>
//                   )}
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//           <FormHelperText>
//             {(function () {
//               if (fieldState.error) {
//                 return fieldState.error.message
//               }
//               if (!fieldState.isDirty) {
//                 return 'Please upload image'
//               }
//             })()}
//           </FormHelperText>
//         </FormControl>
//       )}
//     />
//   )
// }

// export default ImageInput
