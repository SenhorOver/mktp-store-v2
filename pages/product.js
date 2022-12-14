import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography 
} from "@mui/material"
import Carousel from "react-material-ui-carousel"

import TemplateDefault from "../src/templates/Default"
import theme from "../src/theme"

const Product = () => {
    return (
        <TemplateDefault>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Carousel
                                autoPlay={false}
                                navButtonsAlwaysVisible={true}
                                navButtonsProps={{
                                    style: {
                                        color: 'white'
                                    }
                                }}
                                animation='slide'
                            >
                                <Card sx={{ height: '100%' }}>
                                    <CardMedia 
                                        image="https://source.unsplash.com/random?a=1"
                                        title='Titulo da Imagem'
                                        sx={{ paddingTop: '56%' }}
                                    />
                                </Card>
                                <Card sx={{ height: '100%' }}>
                                        <CardMedia 
                                            image="https://source.unsplash.com/random?a=2"
                                            title='Titulo da Imagem'
                                            sx={{ paddingTop: '56%' }}
                                        />
                                </Card>
                            </Carousel>
                        </Box>

                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography component='span' variant='caption'>
                                Publicado 16 junho de 2021
                            </Typography>
                            <Typography component='h4' variant='h4' sx={{ margin: '15px 0' }}>
                                Jaguar XE 2.0 D R-Sport Aut.
                            </Typography>
                            <Typography component='h4' variant='h4' sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
                                R$ 50.000,00
                            </Typography>
                            <Chip label='Categoria' />
                        </Box>

                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography component='h6' variant='h6'>
                                Descrição
                            </Typography>
                            <Typography component={'p'} variant='body2'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={0} sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <CardHeader 
                                avatar={<Avatar>M</Avatar>}
                                title='Marcos Silva'
                                subheader='marcos@email.com'
                            />
                            <CardMedia 
                                image='https://source.unsplash.com/random'
                                title='Marcos Silva'
                            />
                        </Card>

                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography component='h6' variant='h6'>
                                Localização
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Product