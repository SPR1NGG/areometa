'use client';

import { Option, Select as SelectElement } from '@material-tailwind/react';
import { Dispatch, SetStateAction } from 'react';

export interface SelectValue {
	value: string;
	label: string;
}

interface Props {
	label: string;
	setValue: Dispatch<SetStateAction<any | undefined>>;
	values: SelectValue[];
	defValue?: string;
}

export default function Select({ setValue, values, label, defValue }: Props) {
	return (
		<div className="w-full">
			<SelectElement
				label={label}
				color="amber"
				size="lg"
				value={defValue}
				onChange={() => undefined}
			>
				{values.map((value) => (
					<Option value={value.value} key={value.value} onClick={() => setValue(value.value)}>
						{value.label}
					</Option>
				))}
			</SelectElement>
		</div>
	);
}
