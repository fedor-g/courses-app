import React from 'react';
import Logo from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import styles from './header.module.scss';

function Header() {
	return (
		<div className={styles.header}>
			<Logo />
			<div className={styles.button}>
				<Button buttonText='Login' />
			</div>
		</div>
	);
}

export default Header;
