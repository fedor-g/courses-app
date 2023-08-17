import React, { FC } from 'react';

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	buttonText: string;
}

export const Button: FC<Props> = (props) => {
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.buttonText}
		</button>
	);
};
