import { BASE_URL } from 'lib/axios';
import { Dispatch, SetStateAction } from 'react';
import { IoClose } from 'react-icons/io5';

interface Props {
	file?: File;
	setVideo: Dispatch<SetStateAction<File[]>>;
	old?: string;
	setOld?: Dispatch<SetStateAction<string>>;
}

const ContentPreview = ({ file, setOld, setVideo, old }: Props) => {
	if (file) {
		const src = URL.createObjectURL(file);

		if (file.type === 'video/mp4') {
			return (
				<div className="relative w-max">
					<IoClose
						color="red"
						className="cursor-pointer absolute -right-6"
						onClick={() => setVideo([])}
					/>
					<video width="400" controls>
						<source src={src} />
						Your browser does not support HTML5 video.
					</video>
				</div>
			);
		} else {
			return <img className="w-[400px] h-[210px]" src={src} alt="" />;
		}
	}

	if (old && old.includes(`${BASE_URL}/uploads/`) && setOld) {
		if (old.includes('mp4')) {
			return (
				<div className="relative w-max">
					<IoClose
						color="red"
						className="cursor-pointer absolute -right-6"
						onClick={() => setOld('')}
					/>
					<video width="400" controls>
						<source src={old} />
						Your browser does not support HTML5 video.
					</video>
				</div>
			);
		} else {
			return <img className="w-[400px] h-[210px]" src={old} alt="" />;
		}
	}

	return null;
};

export default ContentPreview;
