'use client';
import aresmetaApi from 'api/aresmeta.api';
import GetConferencesQuery from 'api/types/getConferences.query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import IConference from 'types/conference.interface';
import Filter, { ILabel } from './Filter';
import Header from './Header';
import Room from './Room';

const page = () => {
	const [conferences, setConferences] = useState<IConference[]>([]);
	const [query, setQuery] = useState<GetConferencesQuery>({});
	const isFirstRun = useRef<boolean>(true);
	const session = useSession();
	const router = useRouter();
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
		aresmetaApi.getConferences(query).then((data) => setConferences(data));
	}, [query]);

	useEffect(() => {
		console.log(session.data?.user);
		if (!session.data?.user && !isFirstRun.current) {
			isFirstRun.current = false
			router.push('/auth');
		}

		aresmetaApi.getConferences().then((data) => setConferences(data));
	}, []);

	if (session?.data?.user) {
		return (
			<div className="grid h-screen grid-rows-[100px,1fr]">
				<Header />
				<div className="grid grid-cols-1 h-full container mx-auto">
					<div className="p-4 grid grid-rows-[auto,1fr] gap-4 max-h-[calc(100vh_-_100px)]">
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
							{conferences.map(({ name, datetime, id, visibility, creator }) => (
								<Room
									name={name}
									id={id}
									datetime={datetime}
									key={id}
									creator={creator}
									isPublic={visibility === 'public'}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default page;
