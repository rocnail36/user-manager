import { getDictionary, Locale } from "@/app/dictionaries/dictionaries";
import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";

export default async function Account({params}:{params:{lang:Locale}}) {
  await checkAuth();
  const auth =  getUserAuth();
  const dictionary  = getDictionary(params.lang)

  const  [{session},d] = await Promise.all([auth,dictionary])
  
  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">{d.account.title}</h1>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
