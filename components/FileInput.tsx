import { Button } from '@material-tailwind/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
	children: string;
	setImages: Dispatch<SetStateAction<File[]>>;
	name: string;
	isMultiple?: boolean;
}

const FileInput = ({ setImages, children, name, isMultiple = true }: Props) => {
	const handleMultipleImages = (e: ChangeEvent<HTMLInputElement>) => {
		const targetFiles: File[] = Array.from(e.target.files!);
		setImages(targetFiles);
	};

	return (
		<>
			<input
				type="file"
				name={name}
				id={name}
				className="inputfile"
				onChange={(e) => handleMultipleImages(e)}
				multiple={isMultiple}
				accept="image/jpeg, image/png, image/jpg"
			/>
			<label htmlFor={name} className="cursor-pointer w-max">
				<Button className="text-white" color="amber">
					{children}
				</Button>
			</label>
		</>
	);
};

export default FileInput;
