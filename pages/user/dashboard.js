import { useState } from 'react';
import Link from 'next/link'
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

import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'
import ProductsModel from '../../src/models/products'
import dbConnect from '../../src/utils/dbConnect'
import { formatCurrency } from '../../src/utils/currency'
import useToasty from '../../src/contexts/Toasty'

const Home = ({ products }) => {
  const [productId, setProductId] = useState()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [removedProducts, setRemovedProducts] = useState([])
  const { setToasty } = useToasty()

  const handleCloseModal = () => setOpenConfirmModal(false)

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
      text: 'Ops, ocorreu um erro!'
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
          <Button variant='contained' color='primary' sx={{ margin: '30px auto 50px auto', display: 'block'}}>
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
              
              return (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                  <Card 
                    image={`/uploads/${product.files[0].name}`}
                    title={product.title}
                    subtitle={formatCurrency(product.price)}
                    actions={
                      <>
                        <Button size='small' color='primary' >
                          Editar
                        </Button>
                        <Button size='small' color='primary' onClick={() => handleClickRemove(product._id)} >
                          Remover
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