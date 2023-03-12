import React from 'react';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { MdPublic } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

interface Props {
	isPublic?: boolean;
}

const Room = ({ isPublic }: Props) => {
	return (
		<div className="bg-white rounded-xl shadow grid grid-cols-[auto,1fr,auto] items-center p-4">
			<div>
				<div className="flex items-center gap-2">
					<BsFillCalendarCheckFill fill="#FFCC66" />
					Дата проведения: 12.03.2024
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
			<p className="text-center">Название конференции</p>
		</div>
	);
};

export default Room;
