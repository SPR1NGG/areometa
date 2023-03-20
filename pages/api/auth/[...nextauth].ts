import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { username, password } = credentials as any;

				const res = await fetch(`${process.env.API_URL}/auth/login`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({
						email: username,
						password,
					}),
				});
				const user = await res.json();

				if (res.ok && user) {
					return user;
				}

				if (!res.ok) {
					throw new Error(user.message);
				}

				return null;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, account }) {
			//  "user" parameter is the object received from "authorize"
			//  "token" is being send below to "session" callback...
			//  ...so we set "user" param of "token" to object from "authorize"...
			//  ...and return it...
			if (user) {
				token.email = user.email;
				token.sub = user.id;
			}

			if (account) {
				// @ts-ignore
				token.accessToken = user.accessToken;
			}

			return token;
		},
		async session({ session, token }) {
			session.user.email = token.email;
			session.user.id = token.sub;
			session.user.accessToken = token.accessToken;
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth',
	},
};

export default NextAuth(authOptions);
