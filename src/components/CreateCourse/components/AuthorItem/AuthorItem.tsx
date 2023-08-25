import React from 'react';
import { Button } from 'src/common/Button/Button';
import styles from './authoritem.module.scss';

export const AuthorItem = (props) => {
	return (
		<div className={styles.item}>
			<label className={styles.label}>{props.authorName} </label>
			<Button
				className={props.create ? styles.add : styles.remove}
				buttonText={''}
				type='button'
				onClick={props.onClick}
			/>
		</div>
	);
};
