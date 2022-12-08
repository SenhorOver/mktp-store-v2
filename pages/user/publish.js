import { Box, Container, Select, TextField, Typography, Button } from '@mui/material'
import TemplateDefault from '../../src/templates/Default'
import theme from '../../src/theme'

const Publish = () => {

    console.log(theme.palette)

    return (
        <TemplateDefault>
            <Container maxWidth="sm" sx={{ padding: theme.spacing(8, 0, 6) }}>
                <Typography component={'h1'} variant='h2' align='center' color={'textPrimary'}>
                    Publicar Anúncio
                </Typography>
                <Typography component={'h5'} variant='h5' align='center' color={'textPrimary'}>
                    Quanto mais detalhado melhor!
                </Typography>
            </Container>

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
                </Box>
            </Container>
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
            <Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
                <Box textAlign='right'>
                    <Button variant='contained' color='primary'>
                        Publicar Anúncio
                    </Button>
                </Box>
            </Container>
        </TemplateDefault>
    )
}

export default Publish