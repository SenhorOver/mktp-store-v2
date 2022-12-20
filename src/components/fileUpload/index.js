import { useDropzone } from 'react-dropzone';
import { DeleteForever } from '@mui/icons-material'
import {
    Box,
    Typography,
    IconButton,
} from '@mui/material'
import theme from '../../theme';
import Root, { classes } from './styles';

const FileUpload = ({ files, errors, touched, setFieldValue }) => {
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
            {
                errors && touched
                ? <Typography variant='body2' color='error' gutterBottom>{errors}</Typography>
                : null
            }   
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px' }}>
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    width: 185, 
                    height: 130, 
                    margin: '0 15px 15px 0',
                    backgroundColor: theme.palette.background.default, 
                    border: '2px dashed black',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
                {...getRootProps()}
                >
                    <input name='files' {...getInputProps()} />
                    <Typography variant='body2' color={errors && touched ? 'error' : 'textPrimary'}>
                        Clique para adicionar ou arraste a imagem para aqui.
                    </Typography>
                </Box>
                {
                    files.map((file,ix) => (
                        <Box className={classes.imgHover} key={file.preview} sx={{ 
                            backgroundImage: `url(${file.preview})`,
                            width: 185,
                            height: 130,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            position: 'relative',
                            margin: '0 15px 15px 0'
                        }}>
                            {
                                ix === 0 
                                ? 
                                <Box sx={{
                                    backgroundColor: 'blue',
                                    padding: '6px 10px',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                }}>
                                    <Typography variant='body' color='secondary'>
                                        Principal
                                    </Typography>
                                </Box>
                                : null
                                }
                            <Box className={classes.imgMask} sx={{
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                height: '100%',
                                width: '100%',
                                display: 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <IconButton color='secondary' onClick={() => handleRemoveFile(file.preview)}>
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

export default FileUpload