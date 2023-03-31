'use client';
import Button from '@components/Button';
import TextBox from '@components/TextBox';
import { ErrorMessage } from '@hookform/error-message';
import UserService from 'api/services/userService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SlLock } from 'react-icons/sl';
import { toast } from 'react-toastify';
import { ToastItem } from 'react-toastify/dist/types';

type Inputs = {
	newpass: string;
};

interface Props {
	searchParams?: { [key: string]: string };
}

const page = ({ searchParams }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>();
	const router = useRouter();

	const onSubmit = async (data: Inputs) => {
		if (searchParams) {
			await UserService.reset(searchParams.token, data.newpass);
			reset({ newpass: '' });
			toast.success('Пароль успешно изменён');
			toast.onChange(() => {
				router.push('/auth');
			});
		}
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
				<div>
					<TextBox
						useForm={() =>
							register('newpass', {
								required: 'Это поле обязательно',
								minLength: {
									value: 8,
									message: 'Пароль должен быть не меньше 8 символов',
								},
							})
						}
						placeholder="Новый пароль"
						Icon={SlLock}
						type="password"
					/>
					<ErrorMessage className="error" errors={errors} as="p" name="newpass" />
				</div>
				<Button type="submit" onClick={handleSubmit(onSubmit)}>
					Сбросить пароль
				</Button>
			</form>
		</div>
	);
};

export default page;
