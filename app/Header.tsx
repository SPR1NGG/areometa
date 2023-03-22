'use client';

import Button from '@components/Button';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import PopupCreate from './PopupCreate';

const Header = () => {
	const session = useSession();
	const [active, setActive] = useState(false);

	return (
		<div className="bg-white shadow flex justify-between items-center px-8 p-4">
			<div className="flex gap-4 items-center">
				<Image priority alt="логотип" src="/logo.png" width="140" height="70" />
				<Button onClick={() => setActive(true)}>Создать конференцию</Button>
				<Link
					className="bg-[linear-gradient(93deg,#E86605,#FCDF00)] text-white font-medium rounded-xl px-8 py-4"
					href="https://squidass.com/aresmeta/"
				>
					Войти в метавселенную
				</Link>
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
