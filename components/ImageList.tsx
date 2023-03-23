interface Props {
	images: File[];
}

const ImageList = ({ images }: Props) => {
	return (
		<div className="flex gap-2">
			{images.length > 0 &&
				images.map((img) => (
					<img
						key={img.name}
						className="h-[100px] w-[100px] border border-black rounded-xl"
						src={URL.createObjectURL(img)}
					/>
				))}
		</div>
	);
};

export default ImageList;
