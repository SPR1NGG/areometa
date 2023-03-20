'use client';
import Select from '@components/Select';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { Button, Input } from '@material-tailwind/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';

registerLocale('ru', ru);

interface Props {
	setActive: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
	email: string;
};

const PopupCreate = ({ setActive }: Props) => {
	const [startDate, setStartDate] = useState(new Date());
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit = () => {};

	return (
		<div
			className="fixed w-full h-full bg-gray-900 top-0 left-0 bg-opacity-25 flex justify-center items-center"
			onClick={(e) =>
				e.target instanceof Element && !e.target.closest('#create-modal') && setActive(false)
			}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
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
				<input {...register('email')} type="file" name="banner" id="banner" className="inputfile" />
				<label htmlFor="banner" className="cursor-pointer">
					<Button
						className="text-white"
						color="amber"
						nonce={undefined}
						onResize={undefined}
						onResizeCapture={undefined}
					>
						Загрузить баннер
					</Button>
				</label>

				<Select></Select>
				<DatePicker
					locale="ru"
					className="w-full border-t-blue-gray-200 text-blue-gray-700 rounded-lg"
					selected={startDate}
					onChange={(date) => date && setStartDate(date)}
				/>
			</form>
		</div>
	);
};

export default PopupCreate;
