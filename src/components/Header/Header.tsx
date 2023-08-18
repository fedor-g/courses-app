import React from 'react';
import Logo from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import styles from './header.module.scss';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();

	const token = localStorage.getItem('token');
	const userName = localStorage.getItem('userName');

	function handlePush() {
		localStorage.setItem('token', '');
		localStorage.setItem('userName', '');
		navigate('/login', { replace: true });
	}

	return (
		<div className={styles.header}>
			<Logo />
			{userName ? <p className={styles.userName}>{userName}</p> : <></>}
			{token ? (
				<Button
					buttonText='Logout'
					className={styles.button}
					onClick={handlePush}
				/>
			) : (
				<Button
					buttonText='Login'
					className={styles.button}
					onClick={handlePush}
				/>
			)}
		</div>
	);
};
