'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import IConference from 'types/conference.interface';

interface ContextProps {
	conferences: IConference[];
	setConferences: Dispatch<SetStateAction<IConference[]>>;
}

const ConferenceContext = createContext<ContextProps>({
	conferences: [],
	setConferences: (): IConference[] => [],
});

export const ConferenceContextProvider = ({ children }: { children: ReactNode }) => {
	const [conferences, setConferences] = useState<[] | IConference[]>([]);

	return (
		<ConferenceContext.Provider value={{ conferences, setConferences }}>
			{children}
		</ConferenceContext.Provider>
	);
};

export const useConferenceContext = () => useContext(ConferenceContext);
