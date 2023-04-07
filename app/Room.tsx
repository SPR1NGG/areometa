'use client';
import ConferenceService from 'api/services/conferenceService';
import { BASE_URL } from 'lib/axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaFileVideo, FaLock } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import IConference from 'types/conference.interface';
import { useConferenceContext } from './Context/conference';
import { useState } from 'react';
import PopupEdit from './PopupEdit';

const Room = (conference: IConference) => {
	const { visibility, name, datetime, id, creator, media_file, user, banner_filename } = conference;
	const conferenceDate = new Date(datetime);
	const rightDate = new Date(
		conferenceDate.setHours(conferenceDate.getHours() - new Date().getTimezoneOffset() / 60),
	).toISOString();
	const date = rightDate.split('T')[0].split('-');
	const time = rightDate.split('T')[1].split('.')[0];
	const { setConferences } = useConferenceContext();
	const [isEdit, setIsEdit] = useState(false);

	const session = useSession();
	const handleClick = async () => {
		await ConferenceService.remove(id);
		const conferences = await ConferenceService.get();
		setConferences(conferences.data.conferences);
	};

	return (
		<div className="bg-white rounded-xl shadow grid grid-cols-[auto,1fr,auto,auto] items-center p-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<BsFillCalendarCheckFill fill="#FFCC66" />
					Дата проведения: {`${date[2]}.${date[1]}.${date[0]}`}{' '}
					<span className="ml-1">{time.slice(0, -3)}</span>
				</div>
				<div className="flex items-center gap-2">
					{visibility === 'public' ? (
						<>
							<MdPublic fill="#99CC99" />
							Публичная
						</>
					) : (
						<>
							<FaLock fill="#FF6666" />
							Закрытая
						</>
					)}
				</div>
			</div>
			<div>
				<p className="text-center text-xl">{name}</p>
				<p className="text-center text-xs">Автор: {user.name}</p>
			</div>
			{conference.media_file[0].media_type === 'image' && (
				<Image
					priority
					className="h-[90px]"
					src={`${BASE_URL}/uploads/${banner_filename || media_file[0].filename}`}
					alt="баннер"
					height={90}
					width={160}
				/>
			)}
			{conference.media_file[0].media_type === 'video' && <FaFileVideo size={32} fill="#ADD8E6" />}
			{(session?.data?.user?.id === creator || session.data?.user.role === 'admin') && (
				<div className="ml-8 flex gap-2">
					<AiFillEdit
						title="редактировать"
						className="cursor-pointer"
						fill="#99CC99"
						onClick={() => setIsEdit(true)}
					/>
					<AiFillDelete
						title="удалить"
						className="cursor-pointer"
						fill="#FF6666"
						onClick={handleClick}
					/>
				</div>
			)}

			{isEdit && <PopupEdit conference={conference} setActive={setIsEdit} />}
		</div>
	);
};

export default Room;
