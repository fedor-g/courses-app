import React from 'react';

export const Input = (props) => {
	return (
		<input
			className={props.className}
			type={props.type}
			id={props.id}
			//label={props.label}
			placeholder={props.placeholderText}
		/>
	);
};
