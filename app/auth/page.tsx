'use client';
import Button from '@components/Button';
import TextBox from '@components/TextBox';
import { ErrorMessage } from '@hookform/error-message';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { SlLock } from 'react-icons/sl';
import { toast } from 'react-toastify';

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

	const router = useRouter();

	const onSubmit = async (data: Inputs) => {
		const res = await signIn('credentials', {
			password: data.password,
			username: data.username,
			redirect: false,
		});

		if (res?.error) {
			toast.error(res.error);
		} else {
			router.push('/');
		}
	};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[500px] p-[1px] rounded-2xl">
			<div className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image priority className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
				<p className="text-xl font-medium text-center">Вход в систему управления</p>
				<div>
					<TextBox
						placeholder="Почта"
						useForm={() =>
							register('username', {
								required: 'Это поле обязательно',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Неверный email',
								},
							})
						}
						Icon={FiMail}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="username" />
				</div>
				<div>
					<TextBox
						type="password"
						placeholder="Пароль"
						useForm={() =>
							register('password', {
								required: 'Это поле обязательно',
							})
						}
						Icon={SlLock}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="password" />{' '}
				</div>
				<Button onClick={handleSubmit(onSubmit)}>Авторизоваться</Button>
				<div className="flex justify-between justify-items-end gap-16 font-medium">
					<Link href="auth/reg">Зарегистрироваться</Link>
					<Link href="auth/reset">Забыли пароль?</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
