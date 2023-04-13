import axios from 'lib/axios';
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

function parseJwt(token: string) {
	return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

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
			authorize(credentials) {
				console.log('start');
				const { username, password } = credentials as any;
				return axios
					.post(
						'/auth/login',
						{
							email: username,
							password,
						},
						{
							baseURL: process.env.NEXT_PUBLIC_AUTH_API,
						},
					)
					.then((res) => {
						return res.data;
					})
					.catch((error) => {
						console.log(error);
						throw new Error(error.response.data.message);
					});
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, account }) {
			//  "user" parameter is the object received from "authorize"
			//  "token" is being send below to "session" callback...
			//  ...so we set "user" param of "token" to object from "authorize"...
			//  ...and return it...

			if (token.accessToken) {
				const decoded = parseJwt(token.accessToken as string);
				if (Date.now() >= decoded.exp * 1000) {
					const res = await axios.post(
						'/auth/refresh',
						{
							refreshToken: token.refreshToken,
						},
						{
							baseURL: process.env.NEXT_PUBLIC_AUTH_API,
						},
					);

					token.accessToken = res.data.accessToken;
					token.refreshToken = res.data.refreshToken;
				}
			}

			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token as any;
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
