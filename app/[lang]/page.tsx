/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { getDictionary, Locale } from "../dictionaries/dictionaries";
import { Button } from "@/components/ui/button";






export default async function LandingPage({params:{lang}}:{params:{lang:Locale}}) {
 
  const d = await getDictionary(lang)

  return (
    <div className="flex justify-center items-center min-h-screen">
          <Link
            className="text-sm font-medium  underline-offset-4"
            href={`${lang}/sign-in`}
          >
            <Button className=" bg-green-400 rounded-xl px-4 py-2">
            {d.landing.button}
            </Button>
        
          </Link>
     
          
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
