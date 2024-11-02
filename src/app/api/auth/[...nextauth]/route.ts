import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    role: string;
  };
  iat: number;
  exp: number;
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post('http://127.0.0.1:4000/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.status >= 400) {
            console.error('Erro na autorização:', response.data.error);
            throw new Error(response.data.error);
          }

          const token = response.data.token;
          const decoded: DecodedToken = jwtDecode(token);

          // Especifica o tipo exato de `role` como `"USER"` ou `"ADMIN"`
          const role = decoded.user.role as "USER" | "ADMIN";

          return {
            id: decoded.user.id,
            name: decoded.user.name,
            email: decoded.user.email,
            avatarUrl: decoded.user.avatarUrl,
            role: role, // Tipado como "USER" | "ADMIN"
            accessToken: token,
          };
        } catch (error) {
          console.error('Erro na autorização:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          role: user.role,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          avatarUrl: token.user.avatarUrl,
          role: token.user.role,
          accessToken: token.user.accessToken,
        };
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

