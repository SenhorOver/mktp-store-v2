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
    InputAdornment,
    MenuItem,
    FormHelperText,
    Input
} from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik } from 'formik';
import * as yup from 'yup'

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

    const validateSchema = yup.object().shape({
        title: yup.string()
            .min(6, 'Escreva um título maior')
            .max(100, 'Título muito grande')
            .required('Campo obrigatório'),
        
        category: yup.string().required('Campo Obrigatório'),

        description: yup.string()
        .min(50, 'Escreva uma descrição com pelo menos 50 caracteres')
        .required('Campo obrigatório'),
    })

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

                <br /><br />
                <Formik
                    initialValues={{
                        title: '',
                        category: '',
                        description: '',
                    }}
                    validationSchema={validateSchema}
                    onSubmit={(values) => {
                        console.log('enviou o form', values)
                    }}
                >
                    {
                        ({
                            values,
                            errors,
                            handleChange,
                            handleSubmit,
                        }) => {
                            console.log(errors)
                            return (
                                <form onSubmit={handleSubmit}>
                                    {/* Item Name / Category */}
                                    <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                                        <Box sx={{ 
                                            backgroundColor: theme.palette.background.white, 
                                            padding: theme.spacing(3) }}
                                        >
                                            <FormControl error={errors.title} fullWidth>
                                                <InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Título do Anúncio
                                                </InputLabel>
                                                <Input
                                                    variant='standard'
                                                    name='title'
                                                    value={values.title}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.title}
                                                </FormHelperText>
                                            </FormControl>

                                            <br /><br />

                                            <FormControl error={errors.category} fullWidth>
                                                <InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Categoria
                                                </InputLabel>
                                                <Select
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant='standard'
                                                >
                                                    <MenuItem value={'Bebê e Criança'}>Bebê e Criança</MenuItem>
                                                    <MenuItem value={'Agricultura'}>Agricultura</MenuItem>
                                                    <MenuItem value={'Moda'}>Moda</MenuItem>
                                                    <MenuItem value={'Carros, Motos e Barcos'}>Carros, Motos e Barcos</MenuItem>
                                                    <MenuItem value={'Serviços'}>Serviços</MenuItem>
                                                    <MenuItem value={'Lazer'}>Lazer</MenuItem>
                                                    <MenuItem value={'Animais'}>Animais</MenuItem>
                                                    <MenuItem value={'Moveis, Casa e Jardim'}>Moveis, Casa e Jardim</MenuItem>
                                                    <MenuItem value={'Imóveis'}>Imóveis</MenuItem>
                                                    <MenuItem value={'Equipamentos e Ferramentas'}>Equipamentos e Ferramentas</MenuItem>
                                                    <MenuItem value={'Celulares e Tablets'}>Celulares e Tablets</MenuItem>
                                                    <MenuItem value={'Tecnologia'}>Tecnologia</MenuItem>
                                                    <MenuItem value={'Emprego'}>Emprego</MenuItem>
                                                    <MenuItem value={'Outros'}>Outros</MenuItem>
                                                </Select>
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.category}
                                                </FormHelperText>
                                            </FormControl>
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
                                            <FormControl error={errors.description} fullWidth>
                                                <InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Escreva os detalhes do que está vendendo
                                                </InputLabel>
                                                <Input
                                                    name='description'
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    multiline
                                                    rows={6}
                                                    variant='outlined'
                                                />
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.description}
                                                </FormHelperText>
                                            </FormControl>
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
                                                    labelwidth={40}
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
                                            <Button type='submit' variant='contained' color='primary'>
                                                Publicar Anúncio
                                            </Button>
                                        </Box>
                                    </Container>
                                </form>
                            )
                        }
                    }

                </Formik>
            </TemplateDefault>
        </Root>
    )
}

export default Publish