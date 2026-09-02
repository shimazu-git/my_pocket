import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: "anonymous",
      name: "Anonymous",
      credentials: {},
      authorize: async () => {
        const user = await prisma.user.create({
          data: {
            name: "ゲスト",
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    // メールアドレスにアクセス制限
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        const email = user.email;
        const ALLOWED_EMAILS = ["highfivesound1@gmail.com"];

        if (!email || !ALLOWED_EMAILS.includes(email)) {
          return false;
        }
        return true;
      }
      return true;
    },
    session: ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: ({ user, token }) => {
      if (user?.id) {
        token.sub = user.id;
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
});
