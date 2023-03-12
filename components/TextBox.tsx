import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	Icon: IconType;
}

const TextBox = ({ Icon, ...props }: Props) => {
	return (
		<div className="bg-[linear-gradient(#E86604,#FCDE00)] p-[1px] rounded-xl">
			<div className="bg-white flex items-center rounded-xl p-3 gap-2 ">
				<Icon />
				<input className="outline-none focus:ring-0 border-none" type="text" {...props} />
			</div>
		</div>
	);
};

export default TextBox;
