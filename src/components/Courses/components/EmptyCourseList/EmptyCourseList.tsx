import React from 'react';
import styles from './emptycourselist.module.scss';
import { Button } from 'src/common/Button/Button';

export const EmptyCourseList = () => {
	return (
		<div>
			<h1 className={styles.title}>Course List is Empty</h1>
			<h1 className={styles.help}>
				Please use "Add New Course" button to add your first course
			</h1>
			<Button buttonText='Add New Course' className={styles.button} />
		</div>
	);
};
