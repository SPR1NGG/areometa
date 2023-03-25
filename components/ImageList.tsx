import { UPLOAD_URL } from 'lib/axios';
import Image from 'next/image';
import { MediaFile } from 'types/conference.interface';

interface Props {
	images: File[];
	oldImages?: MediaFile[];
}

const ImageList = ({ images, oldImages }: Props) => {
	if (images.length === 0 && oldImages) {
		return (
			<div className="grid grid-cols-[repeat(auto-fit,120px)] gap-2">
				{oldImages.map((img) => (
					<Image
						className="h-[68px] w-[120px] border border-black rounded-xl"
						key={img.id}
						src={`${UPLOAD_URL}${img.filename}`}
						height={68}
						width={120}
						alt=""
					/>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-[repeat(auto-fit,120px)] gap-2">
			{images.length > 0 &&
				images.map((img) => (
					<img
						key={img.name}
						className="h-[68px] w-[120px] border border-black rounded-xl"
						src={URL.createObjectURL(img)}
					/>
				))}
		</div>
	);
};

export default ImageList;
