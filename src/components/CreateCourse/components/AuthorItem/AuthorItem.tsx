import React from 'react';
import styles from './authoritem.module.scss';

export const AuthorItem = (props) => {
	return (
		<div>
			<p className={styles.name}>{props.authorname}</p>+
		</div>
	);
};
