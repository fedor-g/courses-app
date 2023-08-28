import React from 'react';
import Logo from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import styles from './header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/helpers/hooks';
import { logout } from 'src/services';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selector = useAppSelector((state) => state.user);
	const location = useLocation();

	const token = localStorage.getItem('token');
	let user;
	let userName;

	if (selector) {
		user = selector;
		userName = user.name;
	}

	function handlePush() {
		logout(localStorage.getItem('token'));
		localStorage.setItem('token', '');
		localStorage.setItem('userRole', '');
		dispatch({ type: 'DELETE_USER', payload: user.email });
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
