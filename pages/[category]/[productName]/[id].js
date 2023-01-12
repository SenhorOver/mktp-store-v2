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

import ProductsModel from "../../../src/models/products"
import TemplateDefault from "../../../src/templates/Default"
import theme from "../../../src/theme"
import { formatCurrency } from "../../../src/utils/currency"
import dbConnect from "../../../src/utils/dbConnect"
import { formatDate } from "../../../src/utils/date"

const Product = ({ product }) => {
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
                                animation='fade'
                            >
                                {
                                    product.files.map(file => (
                                        <Card key={file.name} sx={{ height: '100%' }}>
                                            <CardMedia 
                                                image={`/uploads/${file.name}`}
                                                title={file.title}
                                                sx={{ paddingTop: '56%' }}
                                            />
                                        </Card>
                                    ))
                                }
                            </Carousel>
                        </Box>

                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography component='span' variant='caption'>
                                Publicado {formatDate(product.criadoEm)}
                            </Typography>
                            <Typography component='h4' variant='h4' sx={{ margin: '15px 0' }}>
                                {product.title}
                            </Typography>
                            <Typography component='h4' variant='h4' sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
                                {formatCurrency(product.price)}
                            </Typography>
                            <Chip label={product.category} />
                        </Box>

                        <Box sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <Typography component='h6' variant='h6'>
                                Descrição
                            </Typography>
                            <Typography component={'p'} variant='body2'>
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={0} sx={{ backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
                            <CardHeader 
                                avatar={
                                <Avatar src={product.user.image}>
                                    {product.user.image || product.user.name[0]}
                                </Avatar>
                            }
                                title={product.user.name}
                                subheader={product.user.email}
                            />
                            <CardMedia 
                                image={product.user.image}
                                title={product.user.name}
                            />
                        </Card>

                        {/* Colocar a localização do usuário */}
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

export async function getServerSideProps({ query }){
    const { id } = query
    await dbConnect()
    
    const product = await ProductsModel.findOne({ _id: id })

    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}

export default Product