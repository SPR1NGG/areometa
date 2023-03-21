import axios from 'lib/axios';
import { useSession } from 'next-auth/react';

export const useRefreshToken = () => {
	const { data: session } = useSession();

	const refreshToken = async () => {
		if (session?.user.refreshToken) {
			const res = await axios.post('/auth/refresh', {
				refreshToken: session.user.refreshToken,
			});

			session.user.accessToken = res.data.accessToken;
			session.user.refreshToken = res.data.refreshToken;
		}
	};

	return refreshToken;
};
