import { Button, Input } from '@material-tailwind/react';
import UserService from 'api/services/UserService';
import { ConferenceMember, RoleEnum } from 'api/types/createConferenceDto';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
	[key: string]: string;
};

interface IProps {
	label: string;
	name: RoleEnum;
	users: ConferenceMember[];
	setUsers: Dispatch<SetStateAction<ConferenceMember[]>>;
}

const UserList = ({ label, name, users, setUsers }: IProps) => {
	const { data: session } = useSession();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	const handleClick = async (data: Inputs) => {
		const {
			data: { email, id },
		} = await UserService.userByEmail(data[name]);
		setUsers((old) => [...old, { email, role: name, user_id: id }]);
		reset({ [name]: '' });
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
								{ email: session!.user.email, user_id: session!.user.id, role: name },
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
						{...register(name)}
					/>
					<Button
						nonce={undefined}
						color="amber"
						className="text-white w-max"
						onResize={undefined}
						onClick={handleSubmit(handleClick)}
						onResizeCapture={undefined}
					>
						Добавить
					</Button>
				</div>

				<div className="flex gap-2">
					{users.map((user) => (
						<span className="bg-gray-200 rounded-xl p-2" key={user.user_id}>
							{user.email}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserList;
