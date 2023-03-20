'use client';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	Icon?: IconType;
	useForm?: () => UseFormRegisterReturn<string>;
}

const TextBox = ({ Icon, useForm, ...props }: Props) => {
	const [visible, setVisible] = useState<'password' | 'text' | false>(false);
	const spread = (useForm && useForm()) || {};

	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] h-[50px] p-[1px] rounded-xl">
			<div className="bg-white flex items-center rounded-xl p-2 gap-2 ">
				{Icon && <Icon />}
				<input
					className="w-full outline-none focus:ring-0 border-none"
					{...props}
					{...spread}
					type={visible || props.type}
				/>
				{props.type === 'password' && visible === false && (
					<AiOutlineEye
						className="w-[20px] h-[20px] cursor-pointer"
						onMouseDown={() => setVisible('text')}
						onMouseUp={() => setVisible(false)}
					/>
				)}
				{props.type === 'password' && visible === 'text' && (
					<AiOutlineEyeInvisible
						className="w-[20px] h-[20px] cursor-pointer"
						onMouseDown={() => setVisible('text')}
						onMouseUp={() => setVisible(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default TextBox;
