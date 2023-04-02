'use client';
import Button from '@components/Button';
import ShowroomService from 'api/services/showroomService';
import ShowroomQuery from 'api/services/showroomService/types/ShowroomQuery';
import { useShowroomContext } from 'app/Context/showroom';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import PopupCreate from './PopupCreate';
import Room from './Room';

const page = () => {
	const [query, setQuery] = useState<ShowroomQuery>();
	const { showroom, setShowroom } = useShowroomContext();
	const session = useSession();
	const router = useRouter();
	const step = 10;
	const total = useRef(0);
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/auth');
		} else {
			ShowroomService.get().then((data) => setShowroom(data.data.showroom));
		}
	}, [session.status]);

	useEffect(() => {
		if (session.status === 'authenticated' && query) {
			ShowroomService.get(query).then(({ data }) => {
				setShowroom(data.showroom);
				total.current = data.total;
			});
		}
	}, [query]);

	const handlePageClick = (event: { selected: number }) => {
		setQuery((prev) => ({ ...prev, limit: step, offset: event.selected * step }));
	};

	if (session?.data?.user) {
		return (
			<div className="grid grid-cols-1 h-full container mx-auto">
				<div className="p-4 flex flex-col gap-4 max-h-[calc(100vh_-_100px)]">
					<div className="flex justify-between items-center">
						<p className="text-xl">Шоурум</p>
						<Button
							className="w-max flex px-4 py-2 items-center gap-2"
							onClick={() => setActive(true)}
						>
							<AiOutlineFileAdd /> Создать шоурум
						</Button>
					</div>
					<div className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
						{showroom.length > 0 && showroom.map((room) => <Room key={room.id} {...room} />)}
					</div>
					{Math.ceil(total.current / step) > 1 && (
						<ReactPaginate
							className="flex gap-2 mx-auto"
							pageLinkClassName="bg-white shadow rounded block text-center px-1 h-[24px] min-w-[24px]"
							nextLinkClassName="bg-white shadow rounded block h-[24px] select-none px-2"
							previousLinkClassName="bg-white shadow rounded block select-none h-[24px] px-2"
							disabledClassName="opacity-50"
							activeLinkClassName="active"
							previousLabel="Назад"
							nextLabel="Вперёд"
							breakLabel={null}
							pageRangeDisplayed={2}
							marginPagesDisplayed={1}
							onPageChange={handlePageClick}
							pageCount={Math.ceil(total.current / step)}
						/>
					)}
				</div>
				{active && <PopupCreate setActive={setActive} />}
			</div>
		);
	}
};

export default page;
