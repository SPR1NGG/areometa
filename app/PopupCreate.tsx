'use client';
import Select from '@components/Select';
import { Button, Input } from '@material-tailwind/react';
import AresmetaApi from 'api/aresmeta.api';
import { AxiosResponse } from 'axios';
import ru from 'date-fns/locale/ru';
import { useSession } from 'next-auth/react';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import UserList from './UserList';

registerLocale('ru', ru);

interface Props {
	setActive: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
	name: string;
};

const PopupCreate = ({ setActive }: Props) => {
	const session = useSession();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const [images, setImages] = useState<File[]>([]);
	const [datetime, setDatetime] = useState<Date>(new Date());
	const [visibility, setVisibility] = useState<'public' | 'private'>('public');
	const listeners = useRef<{ email: string; id: string }[]>();
	const speakers = useRef<{ email: string; id: string }[]>();

	const onSubmit = async (data: Inputs) => {
		const uploadedImg: AxiosResponse<string[]> = await AresmetaApi.uploadImages(
			images,
			session.data?.user.accessToken,
		);

		await AresmetaApi.createConference({
			token: session.data?.user.accessToken,
			name: watch('name'),
			images: uploadedImg.data,
			visibility,
			datetime: new Date(datetime.setHours(datetime.getHours() + 3)),
		});

		setActive(false);
	};

	const handleMultipleImages = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles: string[] = [];
		const targetFiles: File[] = Array.from(e.target.files!);
		const targetFilesObject: File[] = [...targetFiles];
		targetFilesObject.map((file) => {
			return selectedFiles.push(URL.createObjectURL(file));
		});
		setImages(targetFiles);
	};

	return (
		<div
			className="fixed w-full h-full bg-gray-900 top-0 left-0 bg-opacity-25 flex justify-center items-center"
			onClick={(e) =>
				e.target instanceof Element && !e.target.closest('#create-modal') && setActive(false)
			}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				id="create-modal"
				className="bg-white w-max min-w-[600px] rounded-lg p-4 flex flex-col gap-4 relative"
			>
				<RxCross2 onClick={() => setActive(false)} className="self-end cursor-pointer" />
				<Input
					color="amber"
					label="Название коференции"
					nonce={undefined}
					onResize={undefined}
					onResizeCapture={undefined}
					{...register('name')}
				/>
				<Select setVisibility={setVisibility} />
				<DatePicker
					selected={datetime}
					onChange={(date) => date && setDatetime(date)}
					locale="ru"
					showTimeInput
					timeFormat="p"
					className="w-full border-t-blue-gray-200 text-blue-gray-700 rounded-lg"
					dateFormat="Pp"
					minDate={new Date()}
					timeInputLabel="Время:"
				/>
				<input
					type="file"
					name="banner"
					id="banner"
					className="inputfile"
					onChange={(e) => handleMultipleImages(e)}
					multiple
					accept="image/jpeg, image/png, image/jpg"
				/>
				<label htmlFor="banner" className="cursor-pointer">
					<Button
						className="text-white"
						color="amber"
						nonce={undefined}
						onResize={undefined}
						onResizeCapture={undefined}
					>
						Загрузить картинки
					</Button>
				</label>
				<div className="flex gap-2">
					{images.length > 0 &&
						images.map((img) => (
							<img
								key={img.name}
								className="h-[100px] w-[100px] border border-black rounded-xl"
								src={URL.createObjectURL(img)}
							/>
						))}
				</div>
				<UserList label="Спикеры" name="speak" />
				<UserList label="Слушатели" name="list" />
				<Button
					color="amber"
					type="submit"
					className="text-white"
					nonce={undefined}
					onResize={undefined}
					onResizeCapture={undefined}
				>
					Создать конференцию
				</Button>
			</form>
		</div>
	);
};

export default PopupCreate;
