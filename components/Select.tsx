'use client';

import { Select as SelectElement, Option } from '@material-tailwind/react';

export default function Select() {
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
				<Option>Публичная</Option>
				<Option>Закрытая</Option>
			</SelectElement>
		</div>
	);
}
