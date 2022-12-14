import { Paper, InputBase, IconButton, Container, Typography, Box, Grid } from "@mui/material"
import { Search } from "@mui/icons-material"

import TemplateDefault from "../../src/templates/Default"
import theme from "../../src/theme"
import Card from "../../src/components/Card"

const List = () => {
    return (
        <TemplateDefault>
            <Container maxWidth='lg'>

                <Grid container>
                    <Grid item xs={12} sm={12} MD={12}>
                        <Paper sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(0.4, 0.4, 0.4, 1.4), marginTop: '20px' }}>
                            <InputBase
                                placeholder="Ex.: iPhone 12 com garantia"
                                fullWidth
                            />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
                <br />
                    <Grid item>
                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography component='h6' variant='h6'>
                                Anúncios
                            </Typography>
                            <Typography>
                                ENCONTRADOS 200 ANÚNCIOS
                            </Typography>
                            <br />
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card
                                        image={'https://source.unsplash.com/random?a=1'}
                                        title='Produto X'
                                        subtitle={'R$ 60,00'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card
                                        image={'https://source.unsplash.com/random?a=2'}
                                        title='Produto X'
                                        subtitle={'R$ 60,00'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card
                                        image={'https://source.unsplash.com/random?a=3'}
                                        title='Produto X'
                                        subtitle={'R$ 60,00'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default List