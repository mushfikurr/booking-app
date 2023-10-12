import NextAuth, { Session, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

interface BusinessUser extends User {
  isBusinessUser: boolean;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "an@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error(
            JSON.stringify({
              error: "Email / password not provided",
              field: "email",
            })
          );
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { businessUser: true },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error(
            JSON.stringify({
              error: "User does not exist",
              field: "email",
            })
          );
        }

        const matchPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        // if password does not match
        if (!matchPassword) {
          throw new Error(
            JSON.stringify({ error: "Incorrect password", field: "password" })
          );
        }

        console.log(user);

        const isBusinessUser = !!user?.businessUser;
        if (isBusinessUser) {
          return {
            isBusinessUser,
            ...user,
          };
        }
        return { isBusinessUser, ...user };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          isBusinessUser: (user as BusinessUser).isBusinessUser,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: { ...session.user, isBusinessUser: token.isBusinessUser },
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
