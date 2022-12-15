import { DeleteForever } from '@mui/icons-material'
import {
    Box,
    Container,
    Select,
    Typography,
    Button,
    IconButton,
    FormControl,
    InputLabel,
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
    const validateSchema = yup.object().shape({
        title: yup.string()
            .min(6, 'Escreva um título maior')
            .max(100, 'Título muito grande')
            .required('Campo obrigatório'),
        
        category: yup.string().required('Campo Obrigatório'),

        description: yup.string()
        .min(50, 'Escreva uma descrição com pelo menos 50 caracteres')
        .required('Campo obrigatório'),

        price: yup.number()
            .required('Campo Obrigatório'),

        email: yup.string()
            .email('Digite um e-mail válido')
            .required('Campo Obrigatório'),

        name: yup.string().required('Campo Obrigatório'),

        phone: yup.number().required('Campo Obrigatório'),

        files: yup.array().min(1, 'Envie pelo menos uma foto').required('Campo Obrigatório')
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
                        price: '',
                        email: '',
                        name: '',
                        phone: '',
                        files: [],
                    }}
                    validationSchema={validateSchema}
                    onSubmit={(values) => {
                        console.log('enviou o form', values)
                    }}
                >
                    {
                        ({
                            touched,
                            values,
                            errors,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                        }) => {

                            const { getRootProps, getInputProps } = useDropzone({
                                accept: 'image/*',
                                onDrop: (acceptedFile) => {
                                    const newFiles = acceptedFile.map(file => {
                                        return Object.assign(file, {
                                            preview: URL.createObjectURL(file)
                                        })
                                    })
                                    setFieldValue('files', [
                                        ...values.files,
                                        ...newFiles,
                                    ])
                                }
                            })
                        
                            const handleRemoveFile = filePrev => {
                                const newFilesState = values.files.filter(file => filePrev !== file.preview)
                                setFieldValue('files', newFilesState)
                            }

                            return (
                                <form onSubmit={handleSubmit}>
                                    {/* Item Name / Category */}
                                    <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                                        <Box sx={{ 
                                            backgroundColor: theme.palette.background.white, 
                                            padding: theme.spacing(3) }}
                                        >
                                            <FormControl error={errors.title && touched.title} fullWidth>
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
                                                    {errors.title && touched.title ? errors.title : null}
                                                </FormHelperText>
                                            </FormControl>

                                            <br /><br />

                                            <FormControl error={errors.category && touched.category} fullWidth>
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
                                                    {errors.category && touched.category ? errors.category : null}
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
                                            <Typography component='h6' variant='h6' color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                Imagens
                                            </Typography>                   
                                            <Typography component='div' variant='body2' color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                A primeira imagem é a foto principal do seu anúncio
                                            </Typography>
                                            {
                                                errors.files && touched.files
                                                ? <Typography variant='body2' color='error' gutterBottom>{errors.files}</Typography>
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
                                                    <Typography variant='body2' color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                        Clique para adicionar ou arraste a imagem para aqui.
                                                    </Typography>
                                                </Box>
                                                {
                                                    values.files.map((file,ix) => (
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
                                            <FormControl error={errors.description  && touched.description} fullWidth>
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
                                                    {errors.description && touched.description ? errors.description : null}
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

                                            <br />
                                            <FormControl error={errors.price && touched.price} fullWidth variant='outlined'>
                                                <InputLabel sx={{ backgroundColor: 'white', left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Preço de Venda
                                                </InputLabel>
                                                <Input
                                                    name='price'
                                                    value={values.price}
                                                    onChange={handleChange}
                                                    startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
                                                    labelwidth={40}
                                                />
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.price && touched.price  ? errors.price : null}
                                                </FormHelperText>
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
                                            <FormControl error={errors.name && touched.name} fullWidth>
                                                <InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Nome
                                                </InputLabel>
                                                <Input
                                                    variant='standard'
                                                    name='name'
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.name && touched.name  ? errors.name : null}
                                                </FormHelperText>
                                            </FormControl> 

                                            <br /><br />  

                                            <FormControl error={errors.email && touched.email} fullWidth>
                                                <InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Email
                                                </InputLabel>
                                                <Input
                                                    variant='standard'
                                                    name='email'
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.email && touched.email  ? errors.email : null}
                                                </FormHelperText>
                                            </FormControl>  

                                            <br /><br />  

                                            <FormControl error={errors.phone && touched.phone} fullWidth>
                                                <InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
                                                    Telefone
                                                </InputLabel>
                                                <Input
                                                    variant='standard'
                                                    name='phone'
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText sx={{ marginLeft: 0 }}>
                                                    {errors.phone && touched.phone  ? errors.phone : null}
                                                </FormHelperText>
                                            </FormControl> 
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