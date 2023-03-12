import Filter from './Filter';
import Header from './Header';
import Room from './Room';

const page = () => {
	const typeLabels = ['Все', 'Открытые', 'Закрытые'];
	const timeLabels = ['Все', 'Сегодня', 'Завтра', 'На этой неделе'];

	return (
		<div className="grid h-screen grid-rows-[100px,1fr]">
			<Header />
			<div className="grid grid-cols-1 h-full container mx-auto">
				<div className="p-4 grid grid-rows-[auto,1fr] gap-4 max-h-[calc(100vh_-_100px)]">
					<div className="bg-white rounded-xl">
						<Filter filterLabels={typeLabels} />
						<Filter filterLabels={timeLabels} />
					</div>
					<div className="flex flex-col gap-4 pr-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
						<Room isPublic={true} />
						<Room />
						<Room />
						<Room />
						<Room />
						<Room />
						<Room isPublic={true} />
						<Room isPublic={true} />
						<Room />
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
