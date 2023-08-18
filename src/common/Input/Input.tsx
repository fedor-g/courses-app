import React from 'react';

export const Input = (props) => {
	return (
		<input
			className={props.className}
			type='text'
			id={props.id}
			placeholder={props.placeholderText}
		></input>
	);
};
