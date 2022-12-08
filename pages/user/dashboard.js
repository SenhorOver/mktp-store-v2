import { 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Container, 
  createTheme, 
  Grid, 
  Typography 
} from '@mui/material'

import TemplateDefault from '../../src/templates/Default'

const theme = createTheme()

export default function Home() {
  return (
    <TemplateDefault>
      <Container maxWidth="sm" sx={{ padding: theme.spacing(8, 0 ,6) }}>
        <Typography component='h1' variant='h2' align='center'>
          Meus Anúncios
        </Typography>
        <Button variant='contained' color='primary' sx={{ margin: '30px auto', display: 'block'}}>
          Publicar novo anúncioo
        </Button>
      </Container>
      <Container maxWidth="md">
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
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
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
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
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
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}
