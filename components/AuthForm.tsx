"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {  Form,} from "@/components/ui/form"
import Image from "next/image"
import Link  from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signIn, signUp } from '@/lib/actions/auth.action'
import { auth } from '@/firebase/client'

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


const authFormSchema =(type: FormType)=>{
  return z.object({
    name: type === "sign-up" ? z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }) : z.string().optional(),
    email: z.string().email(), 
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",})

      
    })
}

const AuthForm = ({type}: {type: FormType}) => {

  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "", 
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {

        const { name, email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        

        toast.success("Account created successfully. Please Sign In!");
        router.push("/sign-in");
      } else {

        const { email, password } = data;
        const userCredential = await signInWithEmailAndPassword(auth,email, password);

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to get ID token. Please try again.");
          return;
        }
        await signIn({
          email,
          idToken,
        });





        toast.success("Signed In Successfully!");
        router.push("/");
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error appropriately, e.g., show a notification or message
      toast.error("There was an error: " + error);
      
    }
  }


  const isSignIn = type === "sign-in";

  return (
    <div className='card-border lg:min-w-[566px]'  >
      < div className='flex flex-col gap-6 card py-14 px-10'>
      < div className='flex flex-row gap-6 gap-2 justify-center'>
      <Image src="/logo.svg" alt="logo" height={32} width={38} />
      <h2 className='text-primary-100'> PrepWise</h2>
      </div>
      <h3 className=''> Practice Job Interviews with AI </h3>
      
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
          {!isSignIn && (<FormField control={form.control} name="name" label="Name" placeholder="Your Name" />)}
        <FormField control={form.control} name="email" label="Email" placeholder="Your Email Address" type='email'/>
        <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type='password' />

        <Button className='btn' type='submit'>{isSignIn ? "Sign In" : "Create an Account"}</Button>
      </form>
    </Form>
        <p className="text-center text-sm mt-4">
      {isSignIn ? "Don't have an account?" : "Already have an account?"}
      <Link
        href={isSignIn ? "/sign-up" : "/sign-in"}
        className="font-semibold text-user-primary ml-1"
      >
        {isSignIn ? "Sign Up" : "Sign In"}
      </Link>
    </p>

          </div>

    </div>
  )
}

export default AuthForm