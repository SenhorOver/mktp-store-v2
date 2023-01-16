import Link from "next/link"
import slugify from "slugify"
import {
    IconButton,
    InputBase,
    Typography,
    Container,
    Paper,
    Grid 
} from "@mui/material"
import { Search } from "@mui/icons-material"

import TemplateDefault from "../src/templates/Default"
import Card from "../src/components/Card"
import theme from "../src/theme"
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import { formatCurrency } from '../src/utils/currency'

const Home = ({ products }) => {
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
            <Container maxWidth='lg' sx={{ marginTop: '50px' }}>
                <Typography component='h2' variant="h4" align="center" color='textPrimary'>
                    Destaques
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
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps(){
    await dbConnect()

    const products = await ProductsModel.aggregate([{
        $sample: { size: 6 }
    }])

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}

export default Home