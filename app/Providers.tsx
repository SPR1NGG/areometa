'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { ConferenceContextProvider } from './Context/conference';
import { ShowroomContextProvider } from './Context/showroom';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ConferenceContextProvider>
				<ShowroomContextProvider>{children}</ShowroomContextProvider>
			</ConferenceContextProvider>
			<ToastContainer
				position="bottom-left"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				pauseOnFocusLoss={false}
				closeOnClick
				rtl={false}
				draggable
				pauseOnHover
				theme="light"
			/>
		</SessionProvider>
	);
}
