'use client';
import ShowroomService from 'api/services/showroomService';
import { useShowroomContext } from 'app/Context/showroom';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import IShowroom from 'types/showroom.interface';
import PopupEdit from './PopupEdit';

const Room = (showroom: IShowroom) => {
	const { id, added, name, user } = showroom;
	const showroomDate = new Date(added);
	const rightDate = new Date(
		showroomDate.setHours(showroomDate.getHours() - new Date().getTimezoneOffset() / 60),
	).toISOString();
	const date = rightDate.split('T')[0].split('-');
	const time = rightDate.split('T')[1].split('.')[0];
	const { setShowroom } = useShowroomContext();
	const [isEdit, setIsEdit] = useState(false);

	const session = useSession();
	const handleClick = async () => {
		await ShowroomService.remove(id);
		const rooms = await ShowroomService.get();
		setShowroom(rooms.data.showroom);
	};

	return (
		<div className="bg-white rounded-xl shadow grid grid-cols-[auto,1fr,auto,auto] items-center p-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<BsFillCalendarCheckFill fill="#FFCC66" />
					Дата создания: {`${date[2]}.${date[1]}.${date[0]}`}{' '}
					<span className="ml-1">{time.slice(0, -3)}</span>
				</div>
			</div>
			<div>
				<p className="text-center text-xl">{name}</p>
				<p className="text-center text-xs">Автор: {user.name}</p>
			</div>
			{(session?.data?.user?.id === user.id || session.data?.user.role === 'admin') && (
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

			{isEdit && <PopupEdit showroom={showroom} setActive={setIsEdit} />}
		</div>
	);
};

export default Room;
