'use client';

import Button from '@components/Button';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import PopupCreate from './PopupCreate';

const Header = () => {
	const session = useSession();
	const [active, setActive] = useState(false);

	return (
		<div className="bg-white shadow flex justify-between items-center px-8 p-4">
			<div className="flex gap-4 items-center">
				<Image alt="логотип" src="/logo.png" width={140} height={70}></Image>
				<Button onClick={() => setActive(true)}>Создать конференцию</Button>
				{active && <PopupCreate setActive={setActive} />}
			</div>

			<div className="flex items-center gap-4">
				<p>{session.data?.user?.email}</p>
				<p className="select-none">|</p>
				<button onClick={() => signOut()}>Выйти</button>
			</div>
		</div>
	);
};

export default Header;
