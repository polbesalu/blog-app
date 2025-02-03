import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; 

const handler = NextAuth(authOptions);


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            accessToken: string;
        };
    }

    interface User {
        id: string;
        email: string;
        token: string;
    }
}

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

