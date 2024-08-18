"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { LanguageContext } from "@/app/dictionaries/LanguageProvider";

export default function SignIn() {
  const { data: session, status } = useSession();
  const {d} = useContext(LanguageContext)
  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="space-y-3">
        <p>
          {d?.home.as}{" "}
          <span className="font-medium">{session.user?.email}</span>
        </p>
        <Button variant={"destructive"} onClick={() => signOut({ callbackUrl: "/" })}>
          {d?.home.signOut}
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <p>Not signed in </p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
