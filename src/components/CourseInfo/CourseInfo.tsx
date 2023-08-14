import React from 'react';
import styles from './courseinfo.module.scss';
import { Button } from 'src/common/Button/Button';

export const CourseInfo = () => {
	return (
		<div>
			<p className={styles.title}>Course Info</p>
			<div className={styles.button}>
				<Button buttonText='BACK' />
			</div>
		</div>
	);
};
