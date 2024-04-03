"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

const loginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "invalide fields! "}
    }

    const {email,password} = validatedFields.data
    try {
        await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT_URL })
    }catch(error){
        if (error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return { error: "invalid credentials" }
                default:
                    return { error: "unknown error" }
            }
        }
        throw error
    }
}
export default loginAction;