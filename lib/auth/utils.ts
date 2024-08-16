import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";
import Credentials from "next-auth/providers/credentials";
import { compareHashedData, hashData, } from "../bcrypt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const dbUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!dbUser) {
          const password = await hashData(credentials?.password!);
         console.log("gola")
          user = await db.user.create({
            data: {
              email: credentials?.email,
              password,
            },
            
          });
          // return user object with their profile data
          return user;
        }

        const isValidPassword = await compareHashedData(credentials?.password!,dbUser.password)

        if(!isValidPassword) throw Error("invalid password")
         
        return dbUser
          

      },
    }),
  ],
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};
