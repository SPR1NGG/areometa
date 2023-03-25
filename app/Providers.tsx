'use client';

import { SessionProvider } from 'next-auth/react';
import { ConferenceContextProvider } from './Context/conference';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ConferenceContextProvider>{children}</ConferenceContextProvider>
		</SessionProvider>
	);
}
