import React from 'react';
import { Button } from 'src/common/Button/Button';
import styles from './coursecard.module.scss';
import moment from 'moment';
import 'moment-duration-format';
import { useNavigate } from 'react-router-dom';

const STRING_SIZE = 18;

function shortenAuthors(authors: string) {
	return (
		<>
			{authors.length > STRING_SIZE
				? authors.substring(0, STRING_SIZE) + '...'
				: authors}
		</>
	);
}

export const CourseCard = (props) => {
	const navigate = useNavigate();
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
		</div>
	);
};
