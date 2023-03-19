'use client';
import Button from '@components/Button';
import TextBox from '@components/TextBox';
import Image from 'next/image';
import { FiMail } from 'react-icons/fi';
import { SlLock } from 'react-icons/sl';
import { BsFillPersonFill } from 'react-icons/bs';
import Link from 'next/link';
import Checkbox from '@components/Checkbox';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type Inputs = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const page = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const [message, setMessage] = useState('');

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

		if (res.status === 409) {
			setMessage('Такой email уже зарегистрирован');
		}
	};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[600px] p-[1px] rounded-2xl mb-16">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8"
			>
				<Image className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
				<p className="text-xl font-medium text-center">Регистрация</p>
				<p className="text-center">{message}</p>
				<TextBox
					useForm={() =>
						register('email', {
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Неверный email',
							},
						})
					}
					placeholder="Почта"
					Icon={FiMail}
				/>
				{errors.email?.message}
				<TextBox
					useForm={() =>
						register('name', {
							minLength: 3,
						})
					}
					placeholder="Имя"
					Icon={BsFillPersonFill}
				/>
				{errors?.name?.type === 'minLength' && <p>Имя должно быть не меньше 3 букв</p>}
				<TextBox
					useForm={() => register('password', { required: true })}
					type="password"
					placeholder="Пароль"
					Icon={SlLock}
				/>
				<TextBox
					useForm={() =>
						register('confirmPassword', {
							required: true,
							validate: (val: string) => val === watch('password'),
						})
					}
					type="password"
					placeholder="Повторите пароль"
					Icon={SlLock}
				/>
				{errors.confirmPassword?.type === 'validate' && <p>Пароли не совпадают</p>}
				<Checkbox>
					Я даю своё согласие на обработку персональных даннных в соответствии с Политикой
					конфиденциальности и условиями пользования
				</Checkbox>
				<Button onClick={handleSubmit(onSubmit)}>Зарегестрироваться</Button>
				{/* <input
					className="bg-[linear-gradient(93deg,#E86605,#FCDF00)] text-white font-medium rounded-xl px-8 py-4"
					type="submit"
					value="Авторизоваться"
				/> */}
				<div className="text-center gap-16 font-medium">
					<Link href={'auth'}>Авторизоваться</Link>
				</div>
			</form>
		</div>
	);
};

export default page;
