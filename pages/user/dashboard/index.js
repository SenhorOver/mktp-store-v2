import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { 
  Button, 
  Container, 
  Grid, 
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import axios from 'axios';

import TemplateDefault from '../../../src/templates/Default'
import Card from '../../../src/components/Card'
import ProductsModel from '../../../src/models/products'
import dbConnect from '../../../src/utils/dbConnect'
import { formatCurrency } from '../../../src/utils/currency'
import useToasty from '../../../src/contexts/Toasty'
import styles from './styles';
import slugify from 'slugify';

const Home = ({ products }) => {
  const router = useRouter()
  const [productId, setProductId] = useState()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [removedProducts, setRemovedProducts] = useState([])
  const { setToasty } = useToasty()

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickEdit = (productId) => {
    router.push(`/user/edit/${productId}`)
  }

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: {
        id: productId
      }
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId])

    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })
  }

  const handleError = () => {
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, ocorreu um erro, atualize a página e tente novamente!'
    })
  }

  return (
    <TemplateDefault>
      {/* CONFIRM MODAL */}
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          Deseja realmente remover este anúncio?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar a operação, não poderá voltar atrás
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleConfirmRemove} autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>


      { /* DASHBOARD PAGE */ }
      <Container maxWidth="sm">
        <Typography component='h1' variant='h2' align='center'>
          Meus Anúncios
        </Typography>
        <Link href={'/user/publish'}>
          <Button variant='contained' color='primary' sx={styles.newAnnounceBtn}>
            Publicar novo anúncio
          </Button>
        </Link>
      </Container>
      <Container maxWidth="md">
        {
          products.length === 0 &&
          <Typography component={'div'} variant='body1' align='center' color={'textPrimary'} gutterBottom>
            Nenhum anúncio publicado
          </Typography>
        }
        <Grid container spacing={4}>
          {
            products.map(product => {
              if(removedProducts.includes(product._id)) return null
              const category = slugify(product.category).toLocaleLowerCase()
              const title = slugify(product.title).toLocaleLowerCase()
              
              return (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                  <Card 
                    image={`/uploads/${product.files[0].name}`}
                    title={product.title}
                    subtitle={formatCurrency(product.price)}
                    actions={
                      <>
                        <Button size='small' color='primary' onClick={() => handleClickEdit(product._id)} >
                          Editar
                        </Button>
                        <Button size='small' color='primary' onClick={() => handleClickRemove(product._id)} >
                          Remover
                        </Button>
                        <Button size='small' color='primary' onClick={() => router.push(`/${category}/${title}/${product._id}`)}>
                          Ver página
                        </Button>
                      </>
                    }
                  />
                </Grid>
              )
            })  
          }
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps({ req }){
	const { userId } = await getSession({ req })
  await dbConnect()
  
  const products = await ProductsModel.find({ 'user.id': userId })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

Home.requireAuth = true

export default Home