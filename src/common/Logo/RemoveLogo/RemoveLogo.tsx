import React from 'react';
import logo from './logo.png';
import styles from './logo.module.scss';

function RemoveLogo() {
	return <img className={styles.logo} src={logo} alt='logo' />;
}

export default RemoveLogo;
