'use client';
import Button from '@components/Button';
import TextBox from '@components/TextBox';
import { ErrorMessage } from '@hookform/error-message';
import AresmetaApi from 'api/aresmeta.api';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
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
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();
	const router = useRouter();

	const onSubmit = async () => {
		if (searchParams) {
			await AresmetaApi.reset(searchParams.token, watch('newpass'));
			reset({ newpass: '' });
			toast.success('Пароль успешно изменён');
			toast.onChange((payload: ToastItem) => {
				if (payload.status === 'removed') {
					router.push('/auth');
				}
			});
		}
	};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] w-[500px] p-[1px] rounded-2xl mb-16">
			<div className="bg-white rounded-2xl px-16 py-10 flex flex-col gap-8">
				<Image priority className="mx-auto" src="/logo.png" alt="Логотип" width={250} height={144} />
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
				<Button onClick={handleSubmit(onSubmit)}>Сбросить пароль</Button>
			</div>
		</div>
	);
};

export default page;
