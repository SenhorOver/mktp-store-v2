import {
    Card,
    CardMedia,
    CardContent,
    IconButton,
    InputBase,
    Typography,
    Container,
    Paper,
    Grid 
} from "@mui/material"
import { Search } from "@mui/icons-material"
import TemplateDefault from "../src/templates/Default"
import theme from "../src/theme"

const Home = () => {
    return (
        <TemplateDefault>
            <Container disableGutters maxWidth='md'>
                <Typography component='h1' variant="h3" align="center" color='textPrimary'>
                    O que deseja encontrar?
                </Typography>
                <Paper sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(0.4, 0.4, 0.4, 1.4), marginTop: '20px' }}>
                    <InputBase
                        placeholder="Ex.: iPhone 12 com garantia"
                        fullWidth
                    />
                    <IconButton>
                        <Search />
                    </IconButton>
                </Paper>
            </Container>
            <Container maxWidth='lg' sx={{  }}>
                <Typography component='h2' variant="h4" align="center" color='textPrimary'>
                    Destaques
                </Typography>
                <br />
                <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia 
                                image={'https://source.unsplash.com/random'}
                                title="Título da imagem"
                                sx={{ paddingTop: '56%' }}
                            />
                            <CardContent>
                                <Typography variant='h5' component='h2'>
                                Produto X
                                </Typography>
                                <Typography>
                                R$ 60,00
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia 
                                image={'https://source.unsplash.com/random'}
                                title="Título da imagem"
                                sx={{ paddingTop: '56%' }}
                            />
                            <CardContent>
                                <Typography variant='h5' component='h2'>
                                Produto X
                                </Typography>
                                <Typography>
                                R$ 60,00
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia 
                                image={'https://source.unsplash.com/random'}
                                title="Título da imagem"
                                sx={{ paddingTop: '56%' }}
                            />
                            <CardContent>
                                <Typography variant='h5' component='h2'>
                                Produto X
                                </Typography>
                                <Typography>
                                R$ 60,00
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Home