import React from 'react';
import { Button } from 'src/common/Button/Button';
import styles from './coursecard.module.scss';
import moment from 'moment';
import 'moment-duration-format';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/helpers/hooks';
import { shortenAuthors } from 'src/helpers/courseData';
import { deleteCourse } from 'src/services';

export const CourseCard = (props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const roleAdmin = localStorage.getItem('userRole') === 'admin';
	const token = localStorage.getItem('token');

	async function removeCourse(id: string) {
		const result = await deleteCourse(id, token);
		if (result) {
			return dispatch({ type: 'COUSES_LIST:DELETE_COURSE', payload: id });
		} else {
			return false;
		}
	}

	return (
		<div className={styles.coursecard}>
			<p className={styles.title}> {props.title} </p>
			<p className={styles.description}> {props.description} </p>
			<p className={styles.authors}>
				<b>Authors:</b> {shortenAuthors(props.authors.join(', ').toString())}
			</p>
			<p className={styles.duration}>
				<b>Duration: </b>
				{moment.duration(props.duration, 'minutes').format('HH:mm')} hours
			</p>
			<p className={styles.creationDate}>
				<b>Created: </b>
				{moment(props.creationDate, 'DD-MM-YYYY')
					.format('DD.MM.YYYY')
					.toLocaleString()}
			</p>
			<Button
				buttonText='SHOW COURSE'
				onClick={() => {
					navigate('/courses/' + props.id, { replace: true });
				}}
				className={styles.button}
			/>
			{roleAdmin ? (
				<Button
					buttonText=''
					onClick={() => removeCourse(props.id)}
					className={styles.removeButton}
				/>
			) : (
				''
			)}
			{roleAdmin ? (
				<Button
					buttonText=''
					className={styles.editButton}
					onClick={() => {
						navigate('/courses/update/' + props.id, { replace: true });
					}}
				/>
			) : (
				''
			)}
		</div>
	);
};
