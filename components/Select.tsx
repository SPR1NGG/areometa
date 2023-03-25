'use client';

import { Option, Select as SelectElement } from '@material-tailwind/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	visibility?: 'public' | 'private' | undefined;
	setVisibility: Dispatch<SetStateAction<'public' | 'private' | undefined>>;
}

export default function Select({ setVisibility, visibility }: Props) {
	return (
		<div className="w-full">
			<SelectElement
				label="Тип конференции"
				color="amber"
				size="lg"
				onChange={() => undefined}
				value={visibility}
			>
				<Option value="public" onClick={() => setVisibility('public')}>
					Публичная
				</Option>
				<Option value="private" onClick={() => setVisibility('private')}>
					Закрытая
				</Option>
			</SelectElement>
		</div>
	);
}
