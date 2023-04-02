'use client';

import Button from '@components/Button';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
	const session = useSession();
	const pathname = usePathname();

	if (pathname?.includes('auth')) {
		return;
	}

	return (
		<div className="bg-white shadow flex justify-between items-center px-8 p-4">
			<div className="flex gap-4 items-center">
				<Image priority alt="логотип" src="/logo.png" width="140" height="70" />
				<div className="flex gap-4">
					<Link
						href="/"
						className={classNames({
							'opacity-70': pathname === '/',
						})}
					>
						<Button disabled={pathname === '/'}>Конференции</Button>
					</Link>
					<Link
						href="/showroom"
						className={classNames({
							'opacity-70 pointer-events-none': pathname === '/showroom',
						})}
					>
						<Button disabled={pathname === '/showroom'}>Шоурум</Button>
					</Link>
				</div>
				<Link
					className="bg-[linear-gradient(93deg,#E86605,#FCDF00)] text-white font-medium rounded-xl px-8 py-4"
					href="https://aresmeta.sqkrv.com/"
				>
					Войти в метавселенную
				</Link>
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
