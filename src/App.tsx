import React, { useEffect } from 'react';
import { Header } from './components/Header/Header';
import styles from './app.scss';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './helpers/hooks';
import { checkMe } from './services';

export const App = () => {
	const token = localStorage.getItem('token');
	const dispatch = useAppDispatch();

	async function fetchUser() {
		const result = await checkMe(token);
		if (!result) {
			localStorage.setItem('token', '');
			localStorage.setItem('activeSession', 'false');
			return;
		}

		localStorage.setItem('userRole', result.role);
		dispatch({
			type: 'CURRENT_USER:GET_USERS/ME',
			payload: {
				id: result.id,
				name: result.name,
				email: result.email,
				role: result.role,
			},
		});
	}

	useEffect(() => {
		if (token) {
			fetchUser();
		}
	}, []);

	return (
		<div className={styles.main}>
			<Header />
			<Outlet />
		</div>
	);
};
