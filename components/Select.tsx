'use client';

import { Select as SelectElement, Option } from '@material-tailwind/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	setVisibility: Dispatch<SetStateAction<'public' | 'private'>>;
}

export default function Select({setVisibility}: Props) {
	return (
		<div className="w-full">
			<SelectElement
				label="Тип конференции"
				color="amber"
				size="lg"
				nonce={undefined}
				onResize={undefined}
				onResizeCapture={undefined}
			>
				<Option onClick={() => setVisibility('public')}>Публичная</Option>
				<Option onClick={() => setVisibility('private')}>Закрытая</Option>
			</SelectElement>
		</div>
	);
}
