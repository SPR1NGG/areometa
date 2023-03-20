'use client';
import React from 'react';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { MdPublic } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import AresmetaApi from 'api/aresmeta.api';
import { useSession } from 'next-auth/react';

interface Props {
	id: string;
	isPublic?: boolean;
	name: string;
	datetime: string;
	creator: string;
}

const Room = ({ isPublic, name, datetime, id, creator }: Props) => {
	const date = datetime.split('T')[0].split('-');
	const session = useSession() as any;
	const handleClick = async () => {
		await AresmetaApi.removeConference({ id, token: session.data.user.accessToken });
	};

	return (
		<div className="bg-white rounded-xl shadow grid grid-cols-[auto,1fr,auto] items-center p-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<BsFillCalendarCheckFill fill="#FFCC66" />
					Дата проведения: {`${date[2]}.${date[1]}.${date[0]}`}
				</div>
				<div className="flex items-center gap-2">
					{isPublic ? (
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
			<p className="text-center">{name}</p>
			{session?.data?.user?.id === creator && (
				<AiFillDelete className="cursor-pointer" fill="#FF6666" onClick={handleClick} />
			)}
		</div>
	);
};

export default Room;
