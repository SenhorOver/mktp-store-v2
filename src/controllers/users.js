import UsersModel from "../models/users"
import dbConnect from "../utils/dbConnect"
import { crypto } from "../utils/password"

const get = async (req, res) => {
  await dbConnect()
  const users = await UsersModel.find()
  res.status(200).json({ success: true, users })
}

const post = async (req, res) => {
  const {
      name,
      email,
      password
  } = req.body

  await dbConnect()

  const userExist = await UsersModel.find({ email })
  if(userExist.length !== 0){
    return res.status(403).json({ success: false })
  }

  const passwordHash = await crypto(password)

  const user = new UsersModel({
      name,
      email,
      password: passwordHash,
  })

  await user.save()

  res.status(201).json({ success: true }) 
}

export {
  get,
  post
}