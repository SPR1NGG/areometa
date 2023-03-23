import '../styles/globals.css';
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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
