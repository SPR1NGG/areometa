import React from 'react';

const Loading = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loading;
