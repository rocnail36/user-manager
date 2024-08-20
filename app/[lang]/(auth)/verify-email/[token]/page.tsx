import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { db } from "@/lib/db";
import { validateEmail } from "@/lib/api/users/mutations";
const page = async ({ params }: { params: { token: string } }) => {
  const [error, user] = await validateEmail(params.token);

  return error ? (
    <div>usuario no encontrado</div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold text-green-400">
        tu correo {user?.email} ha si verificado
      </h1>
      <Link href={"/sign-in"}>
        <Button className="bg-primary text-white px-4 py-2 rounded-lg">
          iniciar session
        </Button>
      </Link>
    </div>
  );
};

export default page;
