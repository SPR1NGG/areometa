import { Button } from '@material-tailwind/react';
import React from 'react';

const UserList = () => {
	return (
		<div>
			<p>Спикеры</p>
			<div>
				<Button nonce={undefined} onResize={undefined} onResizeCapture={undefined}>Назначить себя спикером</Button>
			</div>
		</div>
	);
};

export default UserList;
