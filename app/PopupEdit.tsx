'use client';
import FileInput from '@components/FileInput';
import ImageList from '@components/ImageList';
import Select from '@components/Select';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Input } from '@material-tailwind/react';
import ConferenceService from 'api/services/conferenceService';
import {
	ConferenceMember,
	RoleEnum,
} from 'api/services/conferenceService/types/createConferenceDto';
import { AxiosResponse } from 'axios';
import ru from 'date-fns/locale/ru';
import { UPLOAD_URL } from 'lib/axios';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import IConference from 'types/conference.interface';
import { useConferenceContext } from './Context/conference';
import UserList from './UserList';

registerLocale('ru', ru);

interface Props {
	setActive: Dispatch<SetStateAction<boolean>>;
	conference: IConference;
}

type Inputs = {
	name: string;
};

const PopupEdit = ({ setActive, conference }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [oldImages, setOldImages] = useState(conference.media_file);
	const [images, setImages] = useState<File[]>([]);
	const [banner, setBanner] = useState<File[]>([]);
	const [datetime, setDatetime] = useState<Date>(new Date(conference.datetime));
	const [visibility, setVisibility] = useState<'public' | 'private' | undefined>(
		conference.visibility,
	);
	const [conferenceMembers, setConferenceMembers] = useState<ConferenceMember[]>(
		conference.conference_member.map((user) => ({
			role: user.role,
			user_id: user.user_id,
			email: user.user.email,
		})),
	);

	const { setConferences } = useConferenceContext();

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
		if (datetime.getTime() < new Date().getTime() - (new Date().getSeconds() + 1) * 1000) {
			toast.error('Нельзя создавать конференции в прошлом времени');
			return;
		}

		const listeners = conferenceMembers.filter((member) => member.role === RoleEnum.attendee);
		const speakers = conferenceMembers.filter((member) => member.role === RoleEnum.speaker);

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

		const deletedImages = conference.media_file.filter((mf) => !oldImages.includes(mf));

		toast.promise(
			ConferenceService.update(
				{
					name: data.name,
					images: [...uploadedImg.data.map((str) => ({ filename: str })), ...deletedImages],
					visibility,
					bannerFilename: bannerImg.data[0],
					datetime: new Date(datetime.setHours(datetime.getHours())),
					conferenceMember: [...listeners, ...speakers],
				},
				conference.id,
			),
			{
				pending: 'Сохранение конференции',
				success: 'Конференция изменена',
			},
		);

		const conferences = await ConferenceService.get();
		setConferences(conferences.data.conferences);

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
					defaultValue={conference.name}
					label="Название коференции"
					{...register('name', {
						required: 'Это поле обязательно',
					})}
				/>
				<ErrorMessage className="error" errors={errors} as="p" name="name" />
				<Select visibility={conference.visibility} setVisibility={setVisibility} />
				<div>
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
				</div>
				<FileInput setImages={setBanner} name="banner" isMultiple={false}>
					Загрузить баннер
				</FileInput>
				{banner.length === 0 && conference.banner_filename ? (
					<Image
						className="h-[90px] w-[160px] border border-black rounded-xl"
						alt="баннер"
						src={`${UPLOAD_URL}${conference.banner_filename}`}
						height={90}
						width={160}
					/>
				) : (
					<ImageList setImages={setBanner} images={banner} />
				)}
				<UserList
					label="Спикеры"
					name={RoleEnum.speaker}
					users={conferenceMembers}
					setUsers={setConferenceMembers}
				/>
				<UserList
					label="Слушатели"
					name={RoleEnum.attendee}
					users={conferenceMembers}
					setUsers={setConferenceMembers}
				/>
				<FileInput setImages={setImages} name="images">
					Загрузить слайды
				</FileInput>
				<ImageList
					setImages={setImages}
					images={images}
					oldImages={oldImages}
					setOldImages={setOldImages}
				/>
				<Button color="amber" type="submit" className="text-white">
					Сохранить
				</Button>
			</form>
		</div>
	);
};

export default PopupEdit;
