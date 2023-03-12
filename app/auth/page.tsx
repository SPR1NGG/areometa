import Button from '@components/Button';
import TextBox from '@components/TextBox';
import Image from 'next/image';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import { SlLock } from 'react-icons/sl';

const page = () => {
	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[500px] p-[1px] rounded-2xl">
			<div className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
				<p className="text-xl font-medium text-center">Вход в систему управления</p>
				<TextBox placeholder="Почта" Icon={FiMail} />
				<TextBox placeholder="Пароль" Icon={SlLock} />
				<Button>Авторизоваться</Button>
				<div className="flex justify-between justify-items-end gap-16 font-medium">
					<Link href="auth/reg">Зарегестрироваться</Link>
					<Link href="auth/reset">Забыли пароль?</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
