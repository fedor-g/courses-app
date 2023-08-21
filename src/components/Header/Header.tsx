import React from 'react';
import Logo from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import styles from './header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();

	const token = localStorage.getItem('token');
	const userName = localStorage.getItem('userName');
	const location = useLocation();

	function handlePush() {
		localStorage.setItem('token', '');
		localStorage.setItem('userName', '');
		navigate('/login', { replace: true });
	}

	function showButton() {
		const pathName = location.pathname;
		if (pathName === '/login' || pathName === '/registration') {
			return;
		} else if (token) {
			return (
				<Button
					buttonText='Logout'
					className={styles.button}
					onClick={handlePush}
				/>
			);
		}
		return (
			<Button
				buttonText='Login'
				className={styles.button}
				onClick={handlePush}
			/>
		);
	}

	return (
		<div className={styles.header}>
			<Logo />
			{userName ? <p className={styles.userName}>{userName}</p> : <></>}
			{showButton()}
		</div>
	);
};
