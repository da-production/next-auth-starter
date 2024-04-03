"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import loginAction from '@/_actions/LoginAction';
import { useState, useTransition } from 'react';
import Link from 'next/link';

const LoginForm = () => {
    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()
    const [isPending,startTransition] = useTransition()
    const {register,handleSubmit,formState: { errors }} = useForm({
        resolver:zodResolver(LoginSchema)
    })
    const submit = (data: z.infer<typeof LoginSchema>) => {
        setError(undefined)
        setSuccess(undefined)
        startTransition(async ()=>{
            loginAction(data)
            .then((data:any)=>{
                setError(data?.error)
                setSuccess(data?.success)
            });
        })
        // console.log(data)
    }
    return (
        <form  onSubmit={handleSubmit(submit)}>
            {
                error && (
                    <div className='w-full mb-3 text-sm bg-red-100 p-3 rounded-md border border-red-300 text-red-500 font-semibold'>
                        {error}
                    </div>
                )
            }
            
            {
                success && (
                    <div className='w-full mb-3 text-sm bg-green-100 p-3 rounded-md border border-green-300 text-green-500 font-semibold'>
                        {success}
                    </div>
                )
            }
            
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Email
                </label>
                <input
                disabled={isPending}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="email@exemple.com"
                    
                    {...register('email')}
                />
                {
                    errors.email && <small className='text-red-500 text-xs'>{errors?.email?.message}</small>
                }
                
            </div>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Password
                </label>
                <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="password"
                    {...register('password')}
                />
                {
                    errors?.password && <small className='text-red-500 text-xs'>{errors?.password?.message}</small>
                }
            </div>
            <div className="text-center mt-6">
                <button
                    disabled={isPending}
                    className="bg-blue-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                >
                    {" "}
                    Login{" "}
                </button>
            </div>
            <div className="text-center text-xs font-semibold hover:underline mt-6">
                <Link href="/auth/register">Dont't have an account?</Link>
            </div>
        </form>
    );
}

export default LoginForm;