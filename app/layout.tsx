import '../styles/globals.css';
import Providers from './Provider';
export const metadata = {
	title: 'Aresmeta',
	description: 'Сайт для создания конференций',
};

interface IProps {
	children: React.ReactNode;
	session: any;
}

export default function RootLayout({ children }: IProps) {
	return (
		<html lang="en">
			<body className="bg-[#F2F2ED]">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
