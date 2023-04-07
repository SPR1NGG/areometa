interface Props {
	src: string;
}

const Video = ({ src }: Props) => {
	return (
		<video width="400" controls>
			<source key={src} src={src} />
			Ваш бразуер не поддерижвает видео.
		</video>
	);
};

export default Video;
