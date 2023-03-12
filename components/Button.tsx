'use client';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}

const Button = ({ children, ...props }: Props) => {
	return (
		<button
			{...props}
			className="bg-[linear-gradient(93deg,#E86605,#FCDF00)] text-white font-medium rounded-xl px-8 py-4"
		>
			{children}
		</button>
	);
};

export default Button;
