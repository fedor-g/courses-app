import React from 'react';
import styles from './authoritem.module.scss';
import Logo from './components/Logo/Logo';

export const AuthorItem = (props) => {
	return (
		<div>
			<p className={styles.name}>{props.authorname}</p>+
			<Logo onClick={props.onClick} />
		</div>
	);
};
