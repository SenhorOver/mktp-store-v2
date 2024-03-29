import fs from 'fs'
import path from 'path'
import formidable from 'formidable-serverless'
import ProductsModel from "../models/products";
import dbConnect from "../utils/dbConnect"

const post = async (req, res) => {
  await dbConnect()
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: 'public/uploads',
    keepExtensions: true,
  })

  form.parse(req, async function(error, fields, data){
    if(error){
      return res.status(500).json({ success: false })
    }
    const {files} = data
    const filesToRename = files instanceof Array
      ? files
      : [files]
    
    const filesToSave = []

    filesToRename.forEach(file => {
      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 9999999999) + 1
      const extension = path.extname(file.name)

      const filename = `${timestamp}_${random}${extension}`

      const oldpath = path.join(__dirname, `../../../../../${file.path}`)
      const newpath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`)

      filesToSave.push({
        name: filename,
        path: newpath
      })

      fs.rename(oldpath, newpath, (error) => {
        if(error){
          console.log(error)
          return res.status(500).json({ success: false, path: 'error' })
        }
      })
    })

    const {
      title,
      category,
      description,
      price,
      name,
      email,
      phone,
      userId,
      image,
      cep,
      uf,
      city,
      district,
      publicPlace,

    } = fields

    const product = new ProductsModel({
      title,
      category,
      description,
      price,
      user: {
        id: userId,
        name,
        email,
        phone,
        image,
      },
      location: {
        cep,
        uf,
        city,
        district,
        publicPlace,
      },
      files: filesToSave,
    })

    const register = await product.save()

    if(register){
      res.status(201).json({ success: true })
    } else {
      res.status(500).json({ success: false })
    }

  })
}

const remove = async (req, res) => {
  await dbConnect()
  
  const { id } = req.body

  const deleted = await ProductsModel.findOneAndDelete({ _id: id })
  if(deleted){
    return res.status(200).json({ success: true })
  } else {
    return res.status(500).json({ success: false })
  }

}

const put = async (req, res) => {
  await dbConnect()
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: 'public/uploads',
    keepExtensions: true,
  })
  
  form.parse(req, async function(error, fields, data){
    const { edit: id } = req.query
    if(error){
      return res.status(500).json({ success: false })
    }

    const {files} = data

    const filesToSave = []

    if(files){
      const filesToRename = files instanceof Array
        ? files
        : [files]
    
        filesToRename.forEach(file => {
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 9999999999) + 1
          const extension = path.extname(file.name)
    
          const filename = `${timestamp}_${random}${extension}`
    
          const oldpath = path.join(__dirname, `../../../../../${file.path}`)
          const newpath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`)
    
          filesToSave.push({
            name: filename,
            path: newpath
          })
    
          fs.rename(oldpath, newpath, (error) => {
            if(error){
              console.log(error)
              return res.status(500).json({ success: false, path: 'error' })
            }
          })
        })
    }
    

    const {
      title,
      category,
      description,
      price,
      name,
      email,
      phone,
      userId,
      image,
      cep,
      uf,
      city,
      district,
      publicPlace,
      existentFiles
    } = fields

    let oldImages = []

    if(existentFiles){
      oldImages = JSON.parse(existentFiles)
  
      oldImages = oldImages instanceof Array
        ? oldImages
        : [oldImages]
    }

    const product = await ProductsModel.findOneAndUpdate({_id: id}, {
      editedIn: Date.now(),
      title,
      category,
      description,
      price,
      user: {
        id: userId,
        name,
        email,
        phone,
        image,
      },
      location: {
        cep,
        uf,
        city,
        district,
        publicPlace,
      },
      files: [...oldImages, ...filesToSave],
    })

    if(product){
      res.status(201).json({ success: true })
    } else {
      res.status(500).json({ success: false })
    }

  })
}

export {
  post,
  remove,
  put
}