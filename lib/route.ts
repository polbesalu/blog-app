import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser {
  id: string;
  email: string;
  token: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:5001/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!res.ok) throw new Error("Invalid credentials");

        const user = (await res.json()) as CustomUser;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

// Updated content of lib/route.js

export const GET = () => {};

export const HEAD = () => {};

export const OPTIONS = () => {};

export const POST = () => {};

export const PUT = () => {};

export const DELETE = () => {};

export const PATCH = () => {};

export const config = {};

export const generateStaticParams = () => {};

export const revalidate = false;

export const dynamic = 'auto';

export const dynamicParams = true;

export const fetchCache = 'auto';

export const preferredRegion = 'auto';

export const runtime = 'nodejs';

export const maxDuration = 0;
