interface Props {
	children: string;
}

const Button = ({ children }: Props) => {
	return (
		<button className="bg-[linear-gradient(93deg,#E86605,#FCDF00)] text-white font-medium rounded-xl px-8 py-4">
			{children}
		</button>
	);
};

export default Button;
