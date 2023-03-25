'use client';

import classNames from 'classnames';
import { useState } from 'react';

export interface ILabel {
	label: string;
	value: string | undefined;
}

interface Props {
	filterLabels: ILabel[];
	setQuery: (val: any) => void;
}

const Filter = ({ filterLabels, setQuery }: Props) => {
	const [active, setActive] = useState(filterLabels[0].label);
	return (
		<div
			style={{ gridTemplateColumns: `repeat(${filterLabels.length}, 1fr` }}
			className={`bg-white grid text-lg rounded-xl p-2 items-center text-center`}
		>
			{filterLabels.map(({ label, value }) => (
				<span
					key={label}
					className={classNames('cursor-pointer', {
						'bg-gray-100 rounded-xl p-2': active === label,
					})}
					onClick={() => {
						if (active !== label) {
							setActive(label);
							setQuery(value);
						}
					}}
				>
					{label}
				</span>
			))}
		</div>
	);
};

export default Filter;
