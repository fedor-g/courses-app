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
		dispatch({
			type: UserActionTypes.ADD_USER,
			payload: { name: result.name, email: result.email },
		});
	}

	if (token) {
		useEffect(() => {
			fetchCourses();
		}, []);
	}

	return (
		<div className={styles.main}>
			<Header />
			<Outlet />
		</div>
	);
};
