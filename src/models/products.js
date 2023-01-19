import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
  name: String,
  path: String,
})

const schema = new mongoose.Schema({
  createdIn: {
    type: Date,
    default: Date.now,
  },
  editedIn: {
    type: Date,
    default: '',
  },
  title: {
        type: String,
        required: [true, 'O campo "título do anúncio" é obrigatório.']
    },
    category: {
        type: String,
        required: [true, 'O campo "categoria" é obrigatório.']
    },
    description: {
      type: String,
      required: [true, 'O campo "descrição" é obrigatório.']
    },
    price: {
      type: Number,
      required: [true, 'O campo "preço" é obrigatório.']
    },
    user: {
      id: String,
      name: String,
      email: String,
      phone: String,
      image: String,
    },
    location: {
      cep: String,
      uf: String,
      city: String,
      district: String,
      publicPlace: String,
    },
    files: {
      type: [filesSchema],
      default: undefined,
    },
})

export default mongoose.models.products || mongoose.model('products', schema)