'use client';
import aresmetaApi from 'api/aresmeta.api';
import GetConferencesQuery from 'api/types/getConferences.query';
import useAxiosAuth from 'lib/hooks/useAxiosAuth';
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
	const session = useSession();
	const router = useRouter();
	const axiosAuth = useAxiosAuth();

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
		console.log(session);
		if (session.status === 'unauthenticated') {
			router.push('/auth');
		} else {
			axiosAuth.get('/conferences').then((data) => setConferences(data.data));
		}
	}, [session.status]);

	useEffect(() => {
		if (session.status === 'authenticated') {
			axiosAuth
				.get('/conferences', {
					params: query,
				})
				.then((data) => setConferences(data.data));
		}
	}, [query]);

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
							{conferences.length > 0 &&
								conferences.map(({ name, datetime, id, visibility, creator }) => (
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
