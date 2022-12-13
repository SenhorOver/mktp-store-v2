import { DeleteForever } from '@mui/icons-material'
import {
    Box,
    Container,
    Select,
    TextField,
    Typography,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment
} from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import TemplateDefault from '../../src/templates/Default'
import theme from '../../src/theme'

const PREFIX = 'Publish';
const classes = {
  imgHover: `${PREFIX}-imgHover`,
  imgMask: `${PREFIX}-imgMask`,
}
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.imgHover}:hover`]: {
    [`& .${classes.imgMask}`]: { display: 'flex' }
  },
}))

const Publish = () => {
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFile) => {
            const newFiles = acceptedFile.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })
            setFiles([
                ...files,
                ...newFiles,
            ])
        }
    })

    const handleRemoveFile = filePrev => {
        const newFilesState = files.filter(file => filePrev !== file.preview)
        setFiles(newFilesState)
    }

    return (
        <Root>
            <TemplateDefault>
                {/* Page Title */}
                <Container maxWidth="sm">
                    <Typography component={'h1'} variant='h2' align='center' color={'textPrimary'}>
                        Publicar Anúncio
                    </Typography>
                    <Typography component={'h5'} variant='h5' align='center' color={'textPrimary'}>
                        Quanto mais detalhado melhor!
                    </Typography>
                </Container>

                {/* Item Name / Category */}
                <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                    <Box sx={{ 
                        backgroundColor: theme.palette.background.white, 
                        padding: theme.spacing(3) }}
                    >
                        <Typography component='h6' variant='h6' color={'textPrimary'}>
                            Título do Anúncio
                        </Typography>
                        <TextField
                            label="ex.: Bicicleta Aro 18 com garantia"
                            size='small'
                            fullWidth
                            variant='standard'
                        />
                        <br /><br />
                        <Typography component='h6' variant='h6' color={'textPrimary'}>
                            Categoria
                        </Typography>
                        <Select
                            native
                            value=''
                            fullWidth
                            // onChange={handleChangeCategory}
                            inputProps={{
                                name: 'age'
                            }}
                            variant='standard'
                        >
                            <option value=""></option>
                            <option value={1}>Bebê e Criança</option>
                            <option value={2}>Agricultura</option>
                            <option value={3}>Moda</option>
                            <option value={4}>Carros, Motos e Barcos</option>
                            <option value={5}>Serviços</option>
                            <option value={6}>Lazer</option>
                            <option value={7}>Animais</option>
                            <option value={8}>Moveis, Casa e Jardim</option>
                            <option value={9}>Imóveis</option>
                            <option value={1}>Equipamentos e Ferramentas</option>
                            <option value={1}>Celulares e Tablets</option>
                            <option value={1}>Tecnologia</option>
                            <option value={1}>Emprego</option>
                            <option value={1}>Outros</option>
                        </Select>
                    </Box>
                </Container>

                {/* Images */}
                <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                    <Box sx={{ 
                        backgroundColor: theme.palette.background.white, 
                        padding: theme.spacing(3) }}
                    >
                        <Typography component='h6' variant='h6' color={'textPrimary'}>
                            Imagens
                        </Typography>                   
                        <Typography component='div' variant='body2' color={'textPrimary'}>
                            A primeira imagem é a foto principal do seu anúncio
                        </Typography>   
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
                                <input {...getInputProps()} />
                                <Typography variant='body2' color={'textPrimary'}>
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
                    </Box>
                </Container>

                {/* Description */}
                <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                    <Box sx={{ 
                        backgroundColor: theme.palette.background.white, 
                        padding: theme.spacing(3) }}
                    >
                        <Typography component='h6' variant='h6' color={'textPrimary'}>
                            Descrição
                        </Typography>                   
                        <Typography component='div' variant='body2' color={'textPrimary'}>
                            Escreva os detalhos do que está vendendo
                        </Typography>                   
                        <TextField
                            multiline
                            rows={6}
                            variant='outlined'
                            fullWidth 
                        />
                    </Box>
                </Container>

                {/* Price */}
                <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                    <Box sx={{ 
                        backgroundColor: theme.palette.background.white, 
                        padding: theme.spacing(3) }}
                    >  
                        <Typography component='h6' variant='h6' color={'textPrimary'}>
                            Preço
                        </Typography>
                        <br />
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel sx={{ backgroundColor: 'white' }}>Valor</InputLabel>
                            <OutlinedInput
                                onChange={() => {}}
                                startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
                                labelWidth={40}
                            />
                        </FormControl>
                    </Box>
                </Container>

                {/* Contact Data */}
                <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                    <Box sx={{ 
                        backgroundColor: theme.palette.background.white, 
                        padding: theme.spacing(3) }}
                    >
                        <Typography component='h6' variant='h6' color={'textPrimary'} gutterBottom>
                            Dados de Contato
                        </Typography>    
                        <TextField
                            label='Nome'
                            variant='outlined'
                            size='small'
                            fullWidth 
                        />
                        <br /><br />                              
                        <TextField
                            label='E-mail'
                            variant='outlined'
                            size='small'
                            fullWidth 
                        />
                        <br /><br />
                        <TextField
                            label='Telefone'
                            variant='outlined'
                            size='small'
                            fullWidth 
                        />
                    </Box>
                </Container>

                {/* Publish Button */}
                <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                    <Box textAlign='right'>
                        <Button variant='contained' color='primary'>
                            Publicar Anúncio
                        </Button>
                    </Box>
                </Container>
            </TemplateDefault>
        </Root>
    )
}

export default Publish