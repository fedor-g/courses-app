import React from 'react';
import Logo from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import styles from './header.module.scss';

export const Header = () => {
	return (
		<div className={styles.header}>
			<Logo />
			<Button buttonText='Login' className={styles.button} />
		</div>
	);
};
