import React from 'react';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { MdPublic } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

interface Props {
	isPublic?: boolean;
	name: string;
	datetime: string;
}

const Room = ({ isPublic, name, datetime }: Props) => {
	//'2020', '03', '19'
	const date = datetime.split('T')[0].split('-');

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
		</div>
	);
};

export default Room;
