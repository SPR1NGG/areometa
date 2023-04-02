'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Button = ({ children, className, ...props }: Props) => {
	return (
		<button
			className={twMerge(
				`bg-[linear-gradient(93deg,#E86605,#FCDF00)] text-white font-medium rounded-xl px-8 py-4 ${className}`,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
