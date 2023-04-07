'use client';
import ContentPreview from '@components/ContentPreview';
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
import { BASE_URL, UPLOAD_URL } from 'lib/axios';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import IConference from 'types/conference.interface';
import { typeLabel, typeValues, visibilityLabel, visibilityValues } from './conference.constants';
import { useConferenceContext } from './Context/conference';
import UserList from './UserList';

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
	const [video, setVideo] = useState<File[]>([]);
	const [old, setOld] = useState<string>(
		`${BASE_URL}/uploads/${conference.media_file[0].filename}`,
	);
	const [images, setImages] = useState<File[]>([]);
	const [banner, setBanner] = useState<File[]>([]);
	const [datetime, setDatetime] = useState<Date>(new Date(conference.datetime));
	const [visibility, setVisibility] = useState<'public' | 'private' | undefined>(
		conference.visibility,
	);
	const [type, setType] = useState<'video' | 'image' | undefined>(
		conference.media_file[0].media_type,
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

		if (type === undefined) {
			toast.error('Укажите тип презентации');
			return;
		}

		const id = toast.loading('Сохранение конференции');

		const uploadedImg: AxiosResponse<string[]> = await ConferenceService.uploadImages(
			type === 'image' ? images : video,
		);
		const bannerImg: AxiosResponse<string[]> = await ConferenceService.uploadImages(banner);
		const deletedImages = conference.media_file.filter((mf) => !oldImages.includes(mf));
		const deletedType = type !== conference.media_file[0].media_type ? conference.media_file : [];

		await ConferenceService.update(
			{
				name: data.name,
				images: [
					...uploadedImg.data.map((str) => ({ filename: str })),
					...deletedImages,
					...deletedType,
				],
				visibility,
				mediaType: type,
				bannerFilename: bannerImg.data[0],
				datetime: new Date(datetime.setHours(datetime.getHours())),
				conferenceMember: [...listeners, ...speakers],
			},
			conference.id,
		);

		toast.update(id, {
			render: 'Конференция изменена',
			type: 'success',
			isLoading: false,
			autoClose: 2500,
		});

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
				<Select
					defValue={conference.visibility}
					label={visibilityLabel}
					values={visibilityValues}
					setValue={setVisibility}
				/>
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
				<Select label={typeLabel} values={typeValues} defValue={type} setValue={setType} />
				{type === 'image' && (
					<>
						<FileInput
							setImages={setImages}
							name="images"
							accept="image/jpeg, image/png, image/jpg, application/pdf"
						>
							Загрузить слайды
						</FileInput>

						<ImageList
							setImages={setImages}
							images={images}
							oldImages={type === conference.media_file[0].media_type ? oldImages : undefined}
							setOldImages={setOldImages}
						/>
					</>
				)}
				{type === 'video' && (
					<>
						<div className="flex items-end gap-1">
							<FileInput setImages={setVideo} name="video" isMultiple={false} accept="video/mp4">
								Загрузить контент
							</FileInput>
							<p className="text-xs">mp4, jpg, png</p>
						</div>

						<ContentPreview
							old={type === conference.media_file[0].media_type ? old : undefined}
							setOld={setOld}
							setVideo={setVideo}
							file={video[0]}
						/>
					</>
				)}
				<Button color="amber" type="submit" className="text-white">
					Сохранить
				</Button>
			</form>
		</div>
	);
};

export default PopupEdit;
