import nextConnect from 'next-connect'
import { put } from '../../../src/controllers/products'

export const config = {
  api: {
    bodyParser: false
  }
}

const route = nextConnect()

route.put(put)

export default route
