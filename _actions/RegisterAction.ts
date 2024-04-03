"use server"

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

import bcryptjs from 'bcryptjs'
import { db } from "@/lib/db";

const RegisterAction = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    
    if(!validatedFields.success) {
        return { error: "invalide fields! "}
    }

    const {name,email,password} = validatedFields.data

    const hashedPassword = await bcryptjs.hash(password,10)

    const exitingEmail = await db.user.findUnique({
        where:{
            email
        }
    })

    if(exitingEmail) return { error: "email already in use!" }

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    // TODO: Send verefication token E-mail 

    return { success: "You have been Registed successfully"}
}
export default RegisterAction;