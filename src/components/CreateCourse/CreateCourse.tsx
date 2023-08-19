import React, { useState } from 'react';
import styles from './createcourse.module.scss';
import { Input } from 'src/common/Input/Input';
import { Button } from 'src/common/Button/Button';
import { AuthorItem } from './components/AuthorItem/AuthorItem';

export const CreateCourse = () => {
	const [authList, updAuthList] = useState([]);
	const [courseAuthList, updCourseAuthList] = useState([]);

	return (
		<div className={styles.createcourse}>
			<p className={styles.title}>Course Edit/Create page</p>
			<form className={styles.form}>
				<p className={styles.section}>Main info</p>
				<label className={styles.param}>Title</label>
				<Input
					className={styles.input}
					id='title'
					label='title'
					placeholderText='Input text'
				/>
				<label className={styles.param}>Description</label>
				<textarea className={styles.textarea} placeholder='Input text' />
				<p className={styles.section}>Duration</p>
				<label className={styles.param}>Duration</label>
				<Input
					className={styles.input}
					id='duration'
					label='duration'
					placeholderText='Input duration'
				/>
				<p className={styles.duration}>00:00 hours</p>
				<p className={styles.section}>Authors</p>
				<label className={styles.param}>Author name</label>
				<Input
					className={styles.input}
					id='authors'
					label='authors'
					placeholderText='Add authors from list'
				/>
				<Button className={styles.button} buttonText={'CREATE AUTHOR'} />
				<p className={styles.authList}>Authors List</p>
				{authList.map((e) => {
					return <AuthorItem authorName={e.name} />;
				})}
				<p className={styles.courseAuthList}>Course Authors</p>
				{courseAuthList.map((e) => {
					return <AuthorItem authorName={e.name} />;
				})}
			</form>
		</div>
	);
};
