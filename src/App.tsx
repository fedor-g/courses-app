import React from 'react';
import { Header } from './components/Header/Header';
import styles from './app.scss';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className={styles.main}>
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
