import { Button, Input } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import React, { MutableRefObject, useState } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
	useremail: string;
};

interface IProps {
	label: string;
	name: string;
	refValue?:
		| MutableRefObject<{
				email: string;
				id: string;
		  }>[]
		| undefined;
}

const UserList = ({ label, name, refValue }: IProps) => {
	const session = useSession() as any;

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	const [users, setUsers] = useState<{ email: string; id: string }[]>([]);

	const handleClick = async () => {
		console.log('first');
		const res = await fetch(`https://aresmeta-back.sqkrv.com/users/${watch('useremail')}`, {
			headers: {
				Authorization: `Bearer ${session.data.user.accessToken}`,
			},
		});
		const user = await res.json();
		setUsers((old) => [...old, { email: user.email, id: user.id }]);
    refValue?.push()
		reset({ useremail: '' });
	};

	return (
		<div>
			<p>{label}</p>
			<div className="">
				<div className="grid grid-cols-[auto,1fr,auto] mb-4 gap-2 items-center">
					<Button
						nonce={undefined}
						color="amber"
						className="text-white w-full p-3"
						onResize={undefined}
						onClick={() =>
							setUsers((old) => [
								...old,
								{ email: session.data.user.email, id: session.data.user.id },
							])
						}
						onResizeCapture={undefined}
					>
						Назначить себя
					</Button>
					<Input
						color="amber"
						label="Email участника"
						nonce={undefined}
						onResize={undefined}
						onResizeCapture={undefined}
						{...register('useremail')}
					/>
					<Button
						nonce={undefined}
						color="amber"
						className="text-white w-max"
						onResize={undefined}
						onClick={handleClick}
						onResizeCapture={undefined}
					>
						Добавить
					</Button>
				</div>

				<div className="flex gap-2">
					{users.map((user) => {
						return (
							<span className="bg-gray-200 rounded-xl p-2" key={user.id}>
								{user.email}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default UserList;
