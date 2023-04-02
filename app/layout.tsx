import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import Header from './Header';
import Providers from './Providers';
export const metadata = {
	title: 'Aresmeta',
	description: 'Сайт для создания конференций',
	icons: {
		icon: '/favicon.png',
		apple: '/apple-touch-icon.png',
	},
};

interface IProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
	return (
		<html lang="ru">
			<body className="bg-[#F2F2ED]">
				<Providers>
					<div className="grid h-screen grid-rows-[100px,1fr]">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
