"use server"

import { LoginSchema } from "@/schemas";
import { z } from "zod";

const loginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "invalide fields! "}
    }
    return { success: "You have been Logged in successfully"}
}
export default loginAction;