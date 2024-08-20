import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import Credentials from "next-auth/providers/credentials";
import { compareHashedData, hashData } from "../bcrypt";
import { Resend } from "resend";
import { resend } from "../email";
import { VerificationEmail } from "@/components/emails/verificationEmail";



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
  pages: {
    signIn:"/sign-in"
  },
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
        

        try {
          const dbUser = await db.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!dbUser) {
            const password = await hashData(credentials?.password!);
            user = await db.user.create({
              data: {
                email: credentials?.email,
                password,
              },
            });
            

            const data = await resend.emails.send({
              from: "Acme <onboarding@resend.dev>",
              to: [credentials?.email!],
              subject: "Verificación de correo",
              react: VerificationEmail({verificationLink: `${process.env.NEXTAUTH_URL}/verify-email/${user.id}`}),
              text: "Email powered by Resend.",
            });

            
          
            
            throw new Error("verify email")
            // return user object with their profile data
          }

          if(!dbUser.emailVerified){
            throw new Error("verify email")
          }

          const isValidPassword = await compareHashedData(
            credentials?.password!,
            dbUser.password!
          );
           
          if (!isValidPassword) throw Error("invalid password");

          return dbUser;
        } catch (error) {
           console.log(error)
          throw error
        }
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
