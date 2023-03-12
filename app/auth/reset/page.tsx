import Button from '@components/Button';
import TextBox from '@components/TextBox';
import Image from 'next/image';
import { FiMail } from 'react-icons/fi';
import { SlLock } from 'react-icons/sl';
import { BsFillPersonFill } from 'react-icons/bs';
import Link from 'next/link';
import Checkbox from '@components/Checkbox';

const page = () => {
	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[500px] p-[1px] rounded-2xl mb-16">
			<div className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
				<p className="text-xl font-medium text-center">Восстановление пароля</p>
				<p>
					Для получения инструкций по востановлению пароля, введите адрес электронной почты,
					указанный при регистрации
				</p>
				<TextBox placeholder="Почта" Icon={FiMail} />
				<Button>Сбросить пароль</Button>
				<div className="text-center gap-16 font-medium">
					<Link href={'auth'}>Авторизоваться</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
