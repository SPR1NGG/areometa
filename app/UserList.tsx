import { Button, Input } from '@material-tailwind/react';
import UserService from 'api/services/userService';
import {
	ConferenceMember,
	RoleEnum,
} from 'api/services/conferenceService/types/createConferenceDto';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

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
		try {
			if (users.find((user) => user.email === data[name])) {
				toast.error('Пользователь уже есть в списке');
				return;
			}

			if (!data[name]) return;

			const {
				data: { email, id },
			} = await UserService.userByEmail(data[name]);
			setUsers((old) => [...old, { email, role: name, user_id: id }]);
			reset({ [name]: '' });
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response!.data.message);
			}
		}
	};

	const addSelf = () => {
		setUsers((old) => [
			...old,
			{ email: session!.user.email, user_id: session!.user.id, role: name },
		]);
	};

	const handleDelete = (user: ConferenceMember) => {
		setUsers((prev) => prev.filter((member) => member !== user));
	};

	return (
		<div>
			<p>{label}</p>
			<div>
				<div className="grid grid-cols-[auto,1fr,auto] mb-4 gap-2 items-center">
					<Button
						color="amber"
						className="text-white w-full p-3"
						disabled={Boolean(users.find((user) => user.user_id === session?.user.id))}
						onClick={addSelf}
					>
						Назначить себя
					</Button>
					<Input color="amber" label="Email участника" {...register(name)} />
					<Button color="amber" className="text-white w-max" onClick={handleSubmit(handleClick)}>
						Добавить
					</Button>
				</div>

				<div className="flex flex-wrap gap-2">
					{users.map((user) => {
						if (user.role === name) {
							return (
								<span
									className="bg-gray-200 rounded-xl p-2 flex gap-2 items-center"
									key={user.user_id}
								>
									{user.email}
									<IoClose
										color="red"
										className="cursor-pointer"
										onClick={() => handleDelete(user)}
									/>
								</span>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};

export default UserList;
