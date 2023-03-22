'use client';
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import TextBox from '@components/TextBox';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { SlLock } from 'react-icons/sl';
import { toast } from 'react-toastify';

type Inputs = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	temp: boolean;
};

const page = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	const router = useRouter();

	const onSubmit = async (data: Inputs) => {
		const res = await fetch('https://aresmeta-back.sqkrv.com/auth/register', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				name: data.name,
			}),
		});

		if (!res.ok) {
			const data = await res.json();

			toast.error(data.message);
		} else {
			toast.success('Сообщение с подтверждением аккаунта отправлено вам на почту', {
				autoClose: 5000,
				pauseOnFocusLoss: true,
			});

			toast.onChange((payload) => {
				if (payload.status === 'removed' && payload.type === 'success') {
					router.push('auth');
				}
			});
		}

		reset({
			confirmPassword: '',
			email: '',
			name: '',
			password: '',
		});
	};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[600px] p-[1px] rounded-2xl mb-16">
			<form className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image priority className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
				<p className="text-xl font-medium text-center">Регистрация</p>
				<div>
					<TextBox
						useForm={() =>
							register('email', {
								required: 'Это поле обязательно',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Неверный email',
								},
							})
						}
						placeholder="Почта"
						Icon={FiMail}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="email" />
				</div>
				<div>
					<TextBox
						useForm={() =>
							register('name', {
								minLength: 3,
							})
						}
						placeholder="Имя"
						Icon={BsFillPersonFill}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="name" />
				</div>
				<div>
					<TextBox
						useForm={() =>
							register('password', {
								required: 'Это поле обязательно',
								minLength: {
									value: 8,
									message: 'Пароль должен быть не меньше 8 символов',
								},
							})
						}
						type="password"
						placeholder="Пароль"
						Icon={SlLock}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="password" />
				</div>
				<div>
					<TextBox
						useForm={() =>
							register('confirmPassword', {
								required: 'Это поле обязательно',
								validate: (val: string) => val === watch('password') || 'Пароли не совпадают',
							})
						}
						type="password"
						placeholder="Повторите пароль"
						Icon={SlLock}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="confirmPassword" />
				</div>
				<div>
					<Checkbox
						useForm={() =>
							register('temp', {
								required: 'Это поле обязательно',
							})
						}
					>
						Я даю своё согласие на обработку персональных даннных в соответствии с Политикой
						конфиденциальности и условиями пользования
					</Checkbox>
					<ErrorMessage className="error" errors={errors} as="p" name="temp" />
				</div>
				<Button onClick={handleSubmit(onSubmit)}>Зарегистрироваться</Button>
				<div className="text-center gap-16 font-medium">
					<Link href={'auth'}>Авторизоваться</Link>
				</div>
			</form>
		</div>
	);
};

export default page;
