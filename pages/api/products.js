import nextConnect from 'next-connect'
import { post } from '../../src/controllers/products'

export const config = {
  api: {
    bodyParser: false
  }
}

const route = nextConnect()

route.post(post)

export default route
