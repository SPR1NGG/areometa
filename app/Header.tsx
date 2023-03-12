'use client';

import Button from '@components/Button';
import Image from 'next/image';
import { useState } from 'react';
import PopupCreate from './PopupCreate';

const Header = () => {
	const [active, setActive] = useState(false);

	return (
		<div className="bg-white shadow flex justify-between items-center px-8 p-4">
			<Image alt="логотип" src="/logo.png" width={140} height={70}></Image>
			<div className="flex items-center gap-4">
				<p>losakovvitalik@gmail.com</p>
				<Button onClick={() => setActive(true)}>Создать конференцию</Button>
				{active && <PopupCreate setActive={setActive} />}
			</div>
		</div>
	);
};

export default Header;
