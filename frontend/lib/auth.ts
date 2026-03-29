import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';

// Validate required environment variables at startup
const requiredEnvVars = ['ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH', 'NEXTAUTH_SECRET'] as const;
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'Admin Login',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL!;
                const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH!;

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Timing-safe comparison via bcrypt
                const isValidPassword = await bcrypt.compare(
                    String(credentials.password),
                    adminPasswordHash
                );

                if (credentials.email === adminEmail && isValidPassword) {
                    return {
                        id: '1',
                        name: 'Admin',
                        email: adminEmail,
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours (production-safe for admin sessions)
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = 'admin';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
            const isLoginPage = request.nextUrl.pathname === '/admin/login';

            if (isAdminRoute && !isLoginPage && !isLoggedIn) {
                return Response.redirect(new URL('/admin/login', request.nextUrl));
            }

            // Redirect logged-in users away from login page
            if (isLoginPage && isLoggedIn) {
                return Response.redirect(new URL('/admin', request.nextUrl));
            }

            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
