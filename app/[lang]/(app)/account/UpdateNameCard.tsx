"use client";
import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useContext, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/app/dictionaries/LanguageProvider";

export default function UpdateNameCard({ name }: { name: string }) {
  const {d} = useContext(LanguageContext)
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { name } = Object.fromEntries(form.entries()) as { name: string };
    if (name.length < 3) {
      toast.error("Name must be longer than 3 characters.");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200)
        toast.success("Successfully updated name!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: d?.account.inputName.title!,
        description:
          d?.account.inputName.help!,
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <Input defaultValue={name ?? ""} name="name"  />
        </AccountCardBody>
        <AccountCardFooter description={d?.account.inputName.help!}>
          <Button >{d?.account.inputName.button}</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
