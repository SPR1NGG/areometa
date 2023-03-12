'use client';
import Select from '@components/Select';
import DatePicker from 'react-datepicker';
import { Input } from '@material-tailwind/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	setActive: Dispatch<SetStateAction<boolean>>;
}

const PopupCreate = ({ setActive }: Props) => {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<div
			className="fixed w-full h-full bg-gray-900 top-0 left-0 bg-opacity-25 flex justify-center items-center"
			onClick={(e) =>
				e.target instanceof Element && !e.target.closest('#create-modal') && setActive(false)
			}
		>
			<div
				id="create-modal"
				className="bg-white w-max min-w-[600px] rounded-lg p-4 flex flex-col gap-4 relative"
			>
				<RxCross2 onClick={() => setActive(false)} className="self-end cursor-pointer" />
				<Input
					color="amber"
					label="Название коференции"
					nonce={undefined}
					onResize={undefined}
					onResizeCapture={undefined}
				/>
				<Select></Select>
				<DatePicker
					className="w-full border-t-blue-gray-200 text-blue-gray-700 rounded-lg"
					selected={startDate}
					onChange={(date) => date && setStartDate(date)}
				/>
			</div>
		</div>
	);
};

export default PopupCreate;
