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
import { formatCurrency } from "../../../src/utils/currency"
import dbConnect from "../../../src/utils/dbConnect"
import { formatDate } from "../../../src/utils/date"
import styles from "./styles"

const Product = ({ product }) => {
    return (
        <TemplateDefault>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box sx={styles.box}>
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

                        <Box sx={styles.box}>
                            <Typography component='span' variant='caption'>
                                Publicado {formatDate(product.createdIn)}
                            </Typography>
                            <Typography component='h4' variant='h4' sx={styles.title}>
                                {product.title}
                            </Typography>
                            <Typography component='h4' variant='h4' sx={styles.price}>
                                {formatCurrency(product.price)}
                            </Typography>
                            <Chip label={product.category} />
                        </Box>

                        <Box sx={styles.box}>
                            <Typography component='h6' variant='h6'>
                                Descrição
                            </Typography>
                            <Typography component={'p'} variant='body2'>
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={0} sx={styles.box}>
                            <CardHeader 
                                avatar={
                                <Avatar src={product.user.image}>
                                    {
                                        product.user.image 
                                            ? null
                                            : product.user.name[0]
                                    }
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
                        <Box sx={styles.box}>
                            <Typography component='h6' variant='h6' gutterBottom>
                                Localização
                            </Typography>

                            <Typography component={'p'} variant='body2'>
                                {'CEP: '}
                                <Typography component={'span'} variant='subtitle2'>
                                    {product.location.cep} 
                                </Typography>
                            </Typography>

                            <Typography component={'p'} variant='body2'>
                                {'UF: '}
                                <Typography component={'span'} variant='subtitle2'>
                                    {product.location.uf} 
                                </Typography>
                            </Typography>

                            <Typography component={'p'} variant='body2'>
                                {'Cidade: '}
                                <Typography component={'span'} variant='subtitle2'>
                                    {product.location.city} 
                                </Typography>
                            </Typography>

                            <Typography component={'p'} variant='body2'>
                                {'Bairro: '}
                                <Typography component={'span'} variant='subtitle2'>
                                    {product.location.district} 
                                </Typography>
                            </Typography>

                            <Typography component={'p'} variant='body2'>
                                {'Logradouro: '}
                                <Typography component={'span'} variant='subtitle2'>
                                    {product.location.publicPlace} 
                                </Typography>
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