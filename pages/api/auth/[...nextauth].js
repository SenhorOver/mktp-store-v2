import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import clientPromise from '../../../src/utils/mongodb'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    
    CredentialsProvider({
      name: "Credentials",
      
      async authorize(credentials) {
        return axios
          .post(`${process.env.APP_URL}/api/auth/signin`, {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw new Error('Invalid')
          });
      }
    })
   
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.JWT_TOKEN,
  },

  adapter: MongoDBAdapter(clientPromise),
}
export default NextAuth(authOptions)