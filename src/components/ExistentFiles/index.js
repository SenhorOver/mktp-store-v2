// import { useDropzone } from 'react-dropzone';
import { DeleteForever } from '@mui/icons-material'
import {
    Box,
    Typography,
    IconButton,
} from '@mui/material'

import Root, { classes, materialStyles } from './styles';

const ExistentFiles = ({ setFieldValue, existentFiles }) => {

    const handleRemoveFile = filePrev => {
        const newFilesState = existentFiles.filter(file => filePrev !== file.name)
        console.log(newFilesState)
        setFieldValue('existentFiles', newFilesState)
    }

    return (
        <Root>
            <Typography component='h6' variant='h6' color={'textPrimary'}>
                Imagens Atuais
            </Typography>                   
            <Typography component='div' variant='body2' color={'textPrimary'}>
                {
                  existentFiles.length !== 0
                    ? 'Essas são as imagens atuais do anúncio'
                    : 'Nenhuma imagem'
                }
                
            </Typography>  
            <Box sx={materialStyles.outsideBox}>
                {
                    existentFiles.map((file,ix) => (
                        <Box className={classes.imgHover} key={file.name} sx={{...materialStyles.addedImagesBox, backgroundImage: `url(/uploads/${file.name})`}}>
                            {
                                ix === 0
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
                                <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)}>
                                    <DeleteForever fontSize='large' />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                }     
            </Box>     
        </Root>
    )
}

export default ExistentFiles