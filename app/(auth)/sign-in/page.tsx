"use client";
import { signIn } from "next-auth/react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";


 


const formSchema = z.object({
  email: z.string({message:"Email is required."}).email("Invalid email."),
  password: z.string({message:"Password is required."}).min(2,"Password must be at leats two characters.")
})

const Page = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
   
    const result = await signIn("credentials", {...values ,redirect:false })
    if(!result?.ok){
     return toast.warning("User or invalid password")
    }
   
    router.push("/dashboard")

  }



  return (
    <main className="bg-popover max-w-lg mx-auto my-4 rounded-lg p-10 min-w-[400px]">
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="xxxx"  type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
    <Toaster className="bg-red-400 text-white" position="top-right"/>
    </main>
  );
};

export default Page;
