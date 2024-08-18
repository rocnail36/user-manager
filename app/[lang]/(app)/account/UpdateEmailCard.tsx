import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useContext, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/app/dictionaries/LanguageProvider";

export default function UpdateEmailCard({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const {d} = useContext(LanguageContext)
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { email } = Object.fromEntries(form.entries()) as { email: string };
    if (email.length < 3) {
      toast.error("Email must be longer than 3 characters.");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200)
        toast.success("Successfully updated email!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: d?.account.inputEmail.title!,
        description:
          d?.account.inputEmail.description!,
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <Input defaultValue={email ?? ""} name="email" disabled={true} />
        </AccountCardBody>
        <AccountCardFooter description={d?.account.inputEmail.help!}>
          <Button disabled={true}>{d?.account.inputEmail.button}</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
