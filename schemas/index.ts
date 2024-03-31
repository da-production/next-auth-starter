import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const LoginSchema = z.object({
    email: z.string().email({message:"Email address is required"}),
    password: z.string().min(1,{message:"Password is required"})
});