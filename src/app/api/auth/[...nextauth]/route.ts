import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { Adapter } from 'next-auth/adapters';
import { sigInEmailPassword } from '@/auth/actions/auth-actions';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter( prisma ) as Adapter,
    providers: [
        GoogleProvider( {
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        } ),
        GithubProvider( {
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        } ),
        CredentialsProvider( {
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electronico", type: "email", placeholder: "email@email.com" },
                password: { label: "Contraseña", type: "password", placeholder: "********" },
            },
            async authorize( credentials, req ) {
                const user = await sigInEmailPassword( credentials!.email, credentials!.password );
                if ( user ) {
                    return user;
                } else {
                    return null;
                }
            }
        } ),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn( { user, account, profile } ) {
            return true;
        },
        async jwt( { token, user, account } ) {
            const dbUser = await prisma.user.findUnique( {
                where: { email: token?.email ?? '' },
            } );
            token.roles = dbUser?.roles ?? [];
            token.id = dbUser?.id ?? '';

            return token;
        },
        async session( { session, token, user } ) {
            if ( session && session.user ) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        },
    }
}

const handler = NextAuth( authOptions );

export { handler as GET, handler as POST };
