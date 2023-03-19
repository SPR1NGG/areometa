import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	Icon?: IconType;
	useForm?: () => UseFormRegisterReturn<string>;
}

const TextBox = ({ Icon, useForm, ...props }: Props) => {
	const spread = (useForm && useForm()) || {};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] p-[1px] rounded-xl">
			<div className="bg-white flex items-center rounded-xl p-2 gap-2 ">
				{Icon && <Icon />}
				<input
					className="w-full outline-none focus:ring-0 border-none"
					type="text"
					{...props}
					{...spread}
				/>
			</div>
		</div>
	);
};

export default TextBox;
