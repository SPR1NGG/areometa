'use client';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
	children: string;
	useForm?: () => UseFormRegisterReturn<string>;
}

const Checkbox = ({ children, useForm }: Props) => {
	const spread = (useForm && useForm()) || {};

	return (
		<label className="flex items-start w-full">
			<input
				type="checkbox"
				name="checkbox-two"
				className="bg-gray-200 border-transparent translate-y-1/3 focus:border-transparent focus:ring-[none] cursor-pointer rounded-lg  checked:hover:bg-amber-600 hover:bg-amber-400 checked:focus:bg-amber-400 focus:bg-gray-200 checked:bg-amber-400"
				{...spread}
			/>
			<p className="ml-3">{children}</p>
		</label>
	);
};

export default Checkbox;
