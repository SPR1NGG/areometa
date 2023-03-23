'use client';
import ConferenceService from 'api/services/ConferenceService';
import { BASE_URL } from 'lib/axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import IConference from 'types/conference.interface';
import { useConferenceContext } from './Context/conference';

const Room = ({
	visibility,
	name,
	datetime,
	id,
	creator,
	media_file,
	user,
	banner_filename,
}: IConference) => {
	const date = datetime.split('T')[0].split('-');
	const time = datetime.split('T')[1].split('.')[0];
	const { setConferences } = useConferenceContext();
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
			<Image
				priority
				className="h-[90px]"
				src={`${BASE_URL}/uploads/${banner_filename || media_file[0].filename}`}
				alt={name}
				height={90}
				width={160}
			/>
			<div className="ml-8">
				{session?.data?.user?.id === creator && (
					<AiFillDelete className="cursor-pointer" fill="#FF6666" onClick={handleClick} />
				)}
			</div>
		</div>
	);
};

export default Room;
