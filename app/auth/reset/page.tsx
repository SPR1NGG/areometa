'use client';
import Button from '@components/Button';
import TextBox from '@components/TextBox';
import { ErrorMessage } from '@hookform/error-message';
import UserService from 'api/services/userService';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { toast, ToastContentProps } from 'react-toastify';
import ErrorResponse from 'types/errorResponse';

type Inputs = {
	email: string;
};

const page = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		toast.promise(UserService.sendResetEmail(data.email), {
			success: 'Ссылка отправлена на вашу почту',
			pending: 'Отправка письма',
			error: {
				render({ data }: ToastContentProps<AxiosError<ErrorResponse>>) {
					return data?.response?.data.message;
				},
			},
		});

		reset({ email: '' });
	};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[500px] p-[1px] rounded-2xl mb-16">
			<form className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image
					priority
					className="mx-auto"
					src="/logo.png"
					alt="Логотип"
					width={250}
					height={144}
				/>
				<p className="text-xl font-medium text-center">Восстановление пароля</p>
				<p>
					Для получения инструкций по востановлению пароля, введите адрес электронной почты,
					указанный при регистрации
				</p>
				<div>
					<TextBox
						useForm={() =>
							register('email', {
								required: 'Это поле обязательно',
							})
						}
						placeholder="Почта"
						Icon={FiMail}
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="email" />
				</div>
				<Button type="submit" onClick={handleSubmit(onSubmit)}>
					Сбросить пароль
				</Button>
				<div className="text-center gap-16 font-medium">
					<Link href={'auth'}>Авторизоваться</Link>
				</div>
			</form>
		</div>
	);
};

export default page;
