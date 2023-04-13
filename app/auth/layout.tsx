'use client';
import Image from 'next/image';
import DocLink from './DocLink';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid grid-rows-[1fr,_auto] justify-items-center items-center min-h-screen py-8">
			{children}
			<div className="flex flex-col gap-5">
				<div className="flex gap-5">
					<DocLink>руководство пользователя</DocLink>
					<DocLink>руководство администратора</DocLink>
					<DocLink>презентация платформы</DocLink>
					<DocLink>условия пользования</DocLink>
					<DocLink>политика конфиденциальности</DocLink>
					<DocLink>пользовательское соглашение</DocLink>
				</div>
				<div className="flex justify-center items-center gap-4">
					<Image priority src={'/logo.png'} alt="логотип" width={74} height={43} />
					<p>Разработано с помощью технологии Aresmeta</p>
					<Image priority src={'/vmir.svg'} alt="метамир" width={166} height={42} />
				</div>
			</div>
		</div>
	);
}
