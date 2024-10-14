import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Importando o jwt-decode

interface DecodedToken {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
	iat: number;
	exp: number;
}

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProviders({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const response = await axios.post('http://localhost:4000/login', {
					email: credentials?.email,
					password: credentials?.password,
				});

				const token = response.data.token;

				if (token && response.status === 200) {
					// Decodificando o token JWT
					const decoded: DecodedToken = jwtDecode(token);
					return {
						id: decoded.user.id,
						name: decoded.user.name,
						email: decoded.user.email,
						image: decoded.user.image,
						accessToken: token,  // Armazenando o token completo
					};
				}
				return null;
			}
		})
	],
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			// Inclui o usuário e o token JWT no callback jwt
			if (user) {
				token.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					accessToken: user.accessToken, // Incluindo o accessToken decodificado
				};
			}

			return token;
		},
		async session({ session, token }) {
			// Passando o token para a session
			if (token.user) {
				session.user = token.user;
				session.accessToken = token.user.accessToken; // Garantindo que o accessToken seja incluído na sessão
			}
			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
