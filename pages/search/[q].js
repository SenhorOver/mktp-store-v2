import Link from 'next/link'
import slugify from "slugify"
import { Paper, InputBase, IconButton, Container, Typography, Box, Grid } from "@mui/material"
import { Search } from "@mui/icons-material"

import TemplateDefault from "../../src/templates/Default"
import Card from "../../src/components/Card"
import dbConnect from "../../src/utils/dbConnect"
import ProductsModel from "../../src/models/products"
import { formatCurrency } from "../../src/utils/currency"
import styles from './styles'

const List = ({ products, searchString }) => {
    return (
        <TemplateDefault>
            <Container maxWidth='lg'>

                <Grid container>
                    <Grid item xs={12} sm={12} MD={12}>
                        <Paper sx={styles.paper}>
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
                        <Box sx={styles.box}>
                            <Typography component='h6' variant='h6'>
                                Anúncios
                            </Typography>
                            <Typography>
                                ENCONTRADOS {products.length} ANÚNCIOS PARA O TERMO "{searchString}"
                            </Typography>
                            <br />
                            <Grid container spacing={4}>
                            {
                                products.map(product => {
                                    const category = slugify(product.category).toLocaleLowerCase()
                                    const title = slugify(product.title).toLocaleLowerCase()
                                    return (
                                        <Grid key={product._id} item xs={12} sm={6} md={4}>
                                            <Link href={`/${category}/${title}/${product._id}`} legacyBehavior>
                                                <a style={{ textDecoration: 'none' }}>
                                                    <Card 
                                                        title={product.title}
                                                        subtitle={formatCurrency(product.price)}
                                                        image={`/uploads/${product.files[0].name}`}
                                                    />
                                                </a>
                                            </Link>
                                        </Grid>
                                    )
                                })
                            }
                            </Grid>
                        </Box>
                    </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    const { q } = query
    await dbConnect()

    const products = await ProductsModel.find({
        $or: [
            { title: { 
                $regex: q,
                $options: 'i'
            }},
            { description: {
                $regex: q,
                $options: 'i'
            }},
        ]
    })

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            searchString: q,
        }
    }
}

export default List