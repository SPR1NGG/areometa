import Link from 'next/link';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface Props {
	children: string;
}

const DocLink = ({ children }: Props) => {
	return (
		<div className="flex items-center gap-1">
			<HiOutlineDocumentText />
			<Link href="/" className="text-gray-700">
				{children}
			</Link>
		</div>
	);
};

export default DocLink;
