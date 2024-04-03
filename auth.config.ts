import Credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/user"
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server"
import { z } from "zod"
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
          const validatedFields =  LoginSchema.safeParse(credentials)
          if(validatedFields.success){
            const { email, password } = validatedFields.data
            const user = await getUserByEmail(email)
            if(!user || !user.password) return NextResponse.json({error: "Email or Password is incorrect"}, {status: 401})

            const isPasswordCorrect = await bcryptjs.compare(password, user.password)
            
            if(isPasswordCorrect){
              return user;
            }

            return null

          }
        }
    })
  ],
} satisfies NextAuthConfig