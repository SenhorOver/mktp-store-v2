import { useDropzone } from 'react-dropzone';
import { DeleteForever } from '@mui/icons-material'
import {
    Box,
    Typography,
    IconButton,
} from '@mui/material'

import Root, { classes, materialStyles } from './styles';

const FileUpload = ({ files, errors, touched, setFieldValue, existentFiles }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFile) => {
            const newFiles = acceptedFile.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })
            setFieldValue('files', [
                ...files,
                ...newFiles,
            ])
        }
    })

    const handleRemoveFile = filePrev => {
        const newFilesState = files.filter(file => filePrev !== file.preview)
        setFieldValue('files', newFilesState)
    }

    return (
        <Root>
            <Typography component='h6' variant='h6' color={errors && touched ? 'error' : 'textPrimary'}>
                Imagens
            </Typography>                   
            <Typography component='div' variant='body2' color={errors && touched ? 'error' : 'textPrimary'}>
                A primeira imagem é a foto principal do seu anúncio
            </Typography>
              
            <Box sx={materialStyles.outsideBox}>
                <Box sx={materialStyles.insideBox}
                {...getRootProps()}
                >
                    <input name='files' {...getInputProps()} />
                    <Typography variant='body2' color={errors && touched ? 'error' : 'textPrimary'}>
                        Clique para adicionar ou arraste a imagem para aqui.
                    </Typography>
                </Box>
                {
                    files.map((file,ix) => (
                        <Box className={classes.imgHover} key={file.preview} sx={{...materialStyles.addedImagesBox, backgroundImage: `url(${file.preview})`}}>
                            {
                                
                                ix === 0 && existentFiles.length === 0
                                ?  (
                                    <Box sx={materialStyles.mainImageSignal}>
                                        <Typography variant='body' color='secondary'>
                                            Principal
                                        </Typography>
                                    </Box>
                                )
                                : null
                                }
                            <Box className={classes.imgMask} sx={materialStyles.deleteMask}>
                                <IconButton color='secondary' onClick={() => handleRemoveFile(file.preview)}>
                                    <DeleteForever fontSize='large' />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                }    
            </Box>     
                {
                    errors && touched
                    ? <Typography variant='body2' color='error' gutterBottom>{errors}</Typography>
                    : null
                }  
        </Root>
    )
}

export default FileUpload