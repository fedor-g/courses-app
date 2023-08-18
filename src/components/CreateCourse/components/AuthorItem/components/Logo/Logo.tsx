import React from 'react';
import logo from './logo.png';
import styles from './logo.module.scss';

function Logo(props) {
	return (
		<img
			className={styles.logo}
			src={logo}
			alt='logo'
			onClick={props.onClick}
		/>
	);
}

export default Logo;
