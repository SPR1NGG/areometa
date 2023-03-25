'use client';
import ConferenceService from 'api/services/conferenceService';
import GetConferencesQuery from 'api/services/conferenceService/types/getConferences.query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useConferenceContext } from './Context/conference';
import Filter, { ILabel } from './Filter';
import Header from './Header';
import Room from './Room';

const page = () => {
	const [query, setQuery] = useState<GetConferencesQuery>();
	const { conferences, setConferences } = useConferenceContext();
	const session = useSession();
	const router = useRouter();
	const step = 10;
	const total = useRef(0);

	const typeLabels: ILabel[] = [
		{ label: 'Все', value: 'all' },
		{ label: 'Открытые', value: 'public' },
		{ label: 'Закрытые', value: 'private' },
	];

	const timeLabels: ILabel[] = [
		{ label: 'Все', value: 'all' },
		{ label: 'Сегодня', value: 'today' },
		{ label: 'Завтра', value: 'tomorrow' },
		{ label: 'Прошедшие', value: 'past' },
	];

	useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/auth');
		} else {
			ConferenceService.get().then((data) => setConferences(data.data.conferences));
		}
	}, [session.status]);

	useEffect(() => {
		if (session.status === 'authenticated' && query) {
			ConferenceService.get(query).then(({ data }) => {
				setConferences(data.conferences);
				total.current = data.total;
			});
		}
	}, [query]);

	const handlePageClick = (event: { selected: number }) => {
		setQuery((prev) => ({ ...prev, limit: step, offset: event.selected * step }));
	};

	if (session?.data?.user) {
		return (
			<div className="grid h-screen grid-rows-[100px,1fr]">
				<Header />
				<div className="grid grid-cols-1 h-full container mx-auto">
					<div className="p-4 flex flex-col gap-4 max-h-[calc(100vh_-_100px)]">
						<div className="bg-white rounded-xl">
							<Filter
								filterLabels={typeLabels}
								setQuery={(val) => setQuery((prev) => ({ ...prev, visibility: val }))}
							/>
							<Filter
								filterLabels={timeLabels}
								setQuery={(val) => setQuery((prev) => ({ ...prev, datetime: val }))}
							/>
						</div>
						<div className="flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
							{conferences.length > 0 &&
								conferences.map((conference) => <Room key={conference.id} {...conference} />)}
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
				</div>
			</div>
		);
	}
};

export default page;
