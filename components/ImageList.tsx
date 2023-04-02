import { UPLOAD_URL } from 'lib/axios';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { MediaFile } from 'types/conference.interface';

interface Props {
	images: File[];
	setImages: Dispatch<SetStateAction<File[]>>;
	oldImages?: MediaFile[];
	setOldImages?: Dispatch<SetStateAction<MediaFile[]>>;
}

const ImageList = ({ images, oldImages, setImages, setOldImages }: Props) => {
	const handleClick = (file: File) => {
		setImages((prev) => prev.filter((img) => img !== file));
	};

	return (
		<div className="grid grid-cols-[repeat(auto-fit,160px)] gap-2">
			{oldImages &&
				setOldImages &&
				oldImages.map((img) => (
					<div key={img.id} className="relative">
						<Image
							className="h-[90px] w-full border border-black rounded-xl"
							key={img.id}
							src={`${UPLOAD_URL}${img.filename}`}
							height={90}
							width={160}
							alt=""
						/>
						<IoClose
							onClick={() => setOldImages((prev) => prev.filter((mf) => mf !== img))}
							color="red"
							className="cursor-pointer absolute top-1 right-1"
						/>
					</div>
				))}
			{images.length > 0 &&
				images.map((img) => {
					if (img.name.includes('pdf')) {
						return (
							<div key={img.name}>
								<p className="text-sm truncate text-over">{img.name}</p>
								<div className="h-[70px] flex justify-center items-center border border-black rounded-xl overl p-1 overflow-hidden text-white bg-purple-200 break-all relative">
									<AiFillFilePdf className="w-full h-full" />
									<IoClose
										onClick={() => handleClick(img)}
										color="red"
										className="cursor-pointer absolute top-1 right-1"
									/>
								</div>
							</div>
						);
					}

					return (
						<div key={img.name} className="relative">
							<img
								className="h-[90px] w-full border border-black rounded-xl"
								src={URL.createObjectURL(img)}
							/>
							<IoClose
								onClick={() => handleClick(img)}
								color="red"
								className="cursor-pointer absolute top-1 right-1"
							/>
						</div>
					);
				})}
		</div>
	);
};

export default ImageList;
