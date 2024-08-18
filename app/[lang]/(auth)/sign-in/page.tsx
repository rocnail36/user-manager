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
import { useContext } from "react";
import { LanguageContext } from "@/app/dictionaries/LanguageProvider";


 




const Page = () => {

  const router = useRouter()
  const {lang} = useContext(LanguageContext)

  const formSchema = z.object({
    email: z.string().email(lang?.auth.emailInput.error),
    password: z.string().min(2,lang?.auth.passWordInput.error!)
  })

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
     return toast.warning(lang?.auth.toastMessage)
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
              <FormLabel>{lang?.auth.emailInput.tile}</FormLabel>
              <FormControl>
                <Input placeholder={lang?.auth.emailInput.placeHolder} {...field} />
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
              <FormLabel>{lang?.auth.passWordInput.title}</FormLabel>
              <FormControl>
                <Input placeholder={lang?.auth.passWordInput.placeHolder}  type="password" {...field} />
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
