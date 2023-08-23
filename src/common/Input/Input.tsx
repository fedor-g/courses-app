import React from 'react';

export const Input = (props) => {
	return (
		<input
			className={props.className}
			type={props.type}
			id={props.id}
			placeholder={props.placeholderText}
			onChange={props.onChange}
		/>
	);
};
