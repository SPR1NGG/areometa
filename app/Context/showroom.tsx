'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import IShowroom from 'types/showroom.interface';

interface ContextProps {
	showroom: IShowroom[];
	setShowroom: Dispatch<SetStateAction<IShowroom[]>>;
}

const ShowroomContext = createContext<ContextProps>({
	showroom: [],
	setShowroom: (): IShowroom[] => [],
});

export const ShowroomContextProvider = ({ children }: { children: ReactNode }) => {
	const [showroom, setShowroom] = useState<[] | IShowroom[]>([]);

	return (
		<ShowroomContext.Provider value={{ showroom, setShowroom }}>
			{children}
		</ShowroomContext.Provider>
	);
};

export const useShowroomContext = () => useContext(ShowroomContext);
