interface Props {
	children: string;
}

const Checkbox = ({ children }: Props) => {
	return (
		<label className="flex items-start w-full">
			<input
				type="checkbox"
				name="checkbox-two"
				className="bg-gray-200 border-transparent translate-y-1/3 focus:border-transparent focus:ring-[none] cursor-pointer rounded-lg  checked:hover:bg-amber-500 hover:bg-amber-400 checked:focus:bg-amber-400 focus:bg-amber-400 checked:bg-amber-400"
			/>
			<p className="ml-3">{children}</p>
		</label>
	);
};

export default Checkbox;
