'use client';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Providers from './Provider';
// export const metadata = {
// 	title: 'Aresmeta',
// 	description: 'Сайт для создания конференций',
// };

interface IProps {
	children: React.ReactNode;
	session: any;
}

export default function RootLayout({ children, session }: IProps) {
	return (
		<html lang="en">
			<body className="bg-[#F2F2ED]">
				<SessionProvider session={session}> {children}</SessionProvider>
			</body>
		</html>
	);
}
