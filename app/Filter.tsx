'use client';

import classNames from 'classnames';
import { useState } from 'react';

interface Props {
	filterLabels: string[];
}

const Filter = ({ filterLabels }: Props) => {
	const [active, setActive] = useState(filterLabels[0]);

	return (
		<div
			style={{ gridTemplateColumns: `repeat(${filterLabels.length}, 1fr` }}
			className={`bg-white grid text-lg rounded-xl p-2 items-center text-center`}
		>
			{filterLabels.map((label) => (
				<span
					key={label}
					className={classNames('cursor-pointer', {
						'bg-gray-100 rounded-xl p-3': active === label,
					})}
					onClick={() => setActive(label)}
				>
					{label}
				</span>
			))}
		</div>
	);
};

export default Filter;
