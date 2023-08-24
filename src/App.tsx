import React, { useEffect } from 'react';
import { Header } from './components/Header/Header';
import styles from './app.scss';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './helpers/hooks';
import { checkMe } from './services';
import { UserActionTypes } from './store/user/types';

export const App = () => {
	const token = localStorage.getItem('token');
	const dispatch = useAppDispatch();

	async function fetchCourses() {
		const result = await checkMe(token);
		if (!result) {
			localStorage.setItem('activeSession', 'false');
			return;
		}

		localStorage.setItem('userRole', result.role);
		dispatch({
			type: UserActionTypes.ADD_USER,
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
			fetchCourses();
		}
	}, []);

	return (
		<div className={styles.main}>
			<Header />
			<Outlet />
		</div>
	);
};
