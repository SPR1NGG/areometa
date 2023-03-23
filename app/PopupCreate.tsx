'use client';
import FileInput from '@components/FileInput';
import ImageList from '@components/ImageList';
import Select from '@components/Select';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Input } from '@material-tailwind/react';
import ConferenceService from 'api/services/ConferenceService';
import { ConferenceMember, RoleEnum } from 'api/types/createConferenceDto';
import { AxiosResponse } from 'axios';
import ru from 'date-fns/locale/ru';
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { toast, ToastContainer } from 'react-toastify';
import { useConferenceContext } from './Context/conference';
import UserList from './UserList';

registerLocale('ru', ru);

interface Props {
	setActive: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
	name: string;
};

const PopupCreate = ({ setActive }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [images, setImages] = useState<File[]>([]);
	const [banner, setBanner] = useState<File[]>([]);
	const [datetime, setDatetime] = useState<Date>(new Date());
	const [visibility, setVisibility] = useState<'public' | 'private'>();
	const [listeners, setListeners] = useState<ConferenceMember[]>([]);
	const [speakers, setSpeakers] = useState<ConferenceMember[]>([]);

	const { setConferences } = useConferenceContext();

	const onSubmit = async (data: Inputs) => {
		if (images.length === 0) {
			toast.error('Загрузите слайды');
			return;
		}

		if (
			((listeners.length === 0 || speakers.length === 0) && visibility === 'private') ||
			(visibility === 'public' && speakers.length === 0)
		) {
			toast.error('Укажите участников');
			return;
		}

		if (visibility === undefined) {
			toast.error('Укажите тип конференции');
			return;
		}

		const uploadedImg: AxiosResponse<string[]> = await ConferenceService.uploadImages(images);
		const bannerImg: AxiosResponse<string[]> = await ConferenceService.uploadImages(banner);

		await ConferenceService.create({
			name: data.name,
			images: uploadedImg.data,
			visibility,
			bannerFilename: bannerImg.data[0],
			datetime: new Date(datetime.setHours(datetime.getHours() + 3)),
			conferenceMember: [...listeners, ...speakers],
		});

		const conferences = await ConferenceService.get();
		setConferences(conferences.data.conferences);

		setActive(false);
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
					autoComplete="off"
					label="Название коференции"
					{...register('name', {
						required: 'Это поле обязательно',
					})}
				/>
				<ErrorMessage className="error" errors={errors} as="p" name="name" />
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
				<FileInput setImages={setBanner} name="banner" isMultiple={true}>
					Загрузить баннер
				</FileInput>
				<ImageList images={banner} />
				<UserList
					label="Слушатели"
					name={RoleEnum.attendee}
					users={speakers}
					setUsers={setSpeakers}
				/>
				<UserList
					label="Спикеры"
					name={RoleEnum.speaker}
					users={listeners}
					setUsers={setListeners}
				/>
				<FileInput setImages={setImages} name="images">
					Загрузить слайды
				</FileInput>
				<ImageList images={images} />
				<Button color="amber" type="submit" className="text-white">
					Создать конференцию
				</Button>
			</form>
			<ToastContainer
				position="bottom-left"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				pauseOnFocusLoss={false}
				closeOnClick
				rtl={false}
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
};

export default PopupCreate;
