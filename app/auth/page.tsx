'use client';
import Button from '@components/Button';
import TextBox from '@components/TextBox';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { SlLock } from 'react-icons/sl';

type Inputs = {
	username: string;
	password: string;
};

const page = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		const result = await signIn('credentials', {
			password: data.password,
			username: data.username,
			redirect: true,
			callbackUrl: '/',
		});
	};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[500px] p-[1px] rounded-2xl">
			<div className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
				<p className="text-xl font-medium text-center">Вход в систему управления</p>
				<TextBox
					defaultValue=""
					placeholder="Почта"
					useForm={() => register('username')}
					Icon={FiMail}
				/>
				<TextBox
					type="password"
					placeholder="Пароль"
					useForm={() => register('password')}
					Icon={SlLock}
				/>
				<Button onClick={handleSubmit(onSubmit)}>Авторизоваться</Button>
				<div className="flex justify-between justify-items-end gap-16 font-medium">
					<Link href="auth/reg">Зарегестрироваться</Link>
					<Link href="auth/reset">Забыли пароль?</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
