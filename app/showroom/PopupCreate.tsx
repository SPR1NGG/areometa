'use client';
import FileInput from '@components/FileInput';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Input } from '@material-tailwind/react';
import ShowroomService from 'api/services/showroomService';
import { useShowroomContext } from 'app/Context/showroom';
import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import ContentPreview from '@components/ContentPreview';

interface Props {
	setActive: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
	name: string;
	url: string;
};

const PopupCreate = ({ setActive }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [video, setVideo] = useState<File[]>([]);
	const { setShowroom } = useShowroomContext();

	useEffect(() => {
		const handlekey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActive(false);
			}
		};

		document.body.addEventListener('keydown', handlekey);

		return () => {
			document.body.removeEventListener('keydown', handlekey);
		};
	}, []);

	const onSubmit = async (data: Inputs) => {
		const uploadedVideo: AxiosResponse<string[]> = await ShowroomService.uploadVideo(video[0]);

		await toast.promise(
			ShowroomService.create({
				filename: uploadedVideo.data[0],
				name: data.name,
				url: data.url,
			}),
			{
				pending: 'Создание шоурума',
				success: 'Шоурум создан',
			},
		);

		const rooms = await ShowroomService.get();
		setShowroom(rooms.data.showroom);

		setActive(false);
	};

	return (
		<div
			className="fixed w-full h-full bg-gray-900 top-0 left-0 bg-opacity-25 flex justify-center items-center"
			onMouseDown={(e) =>
				e.target instanceof Element && !e.target.closest('#create-modal') && setActive(false)
			}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				id="create-modal"
				className="bg-white overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded max-h-[80vh] w-[700px] rounded-lg p-4 flex flex-col gap-4 relative"
			>
				<RxCross2 onClick={() => setActive(false)} className="self-end cursor-pointer" />

				<Input
					color="amber"
					autoComplete="off"
					label="Название"
					{...register('name', {
						required: 'Это поле обязательно',
					})}
				/>

				<ErrorMessage className="error" errors={errors} as="p" name="name" />

				<div>
					<div className="flex items-end gap-1">
						<FileInput
							setImages={setVideo}
							name="banner"
							isMultiple={false}
							accept="image/jpeg, image/png, image/jpg, video/mp4"
						>
							Загрузить контент
						</FileInput>
						<p className="text-xs">mp4, jpg, png</p>
					</div>
					{/* <p className="my-2">или</p>
					<Input
						color="amber"
						autoComplete="off"
						label="Укажите ссылку"
						disabled={video.length === 1}
						{...register('url')}
					/> */}
				</div>

				<ContentPreview setVideo={setVideo} file={video[0]} />

				<Button color="amber" type="submit" style={{ overflow: 'initial' }} className="text-white">
					Создать шоурум
				</Button>
			</form>
		</div>
	);
};

export default PopupCreate;
