import React from 'react';
import { Button } from 'src/common/Button/Button';
import styles from './coursecard.module.scss';
import moment from 'moment';
import 'moment-duration-format';

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
	return (
		<div className={styles.coursecard}>
			<p className={styles.title}> {props.e.title} </p>
			<p className={styles.description}> {props.e.description} </p>
			<p className={styles.authors}>
				<b>Authors:</b> {shortenAuthors(props.e.authors.join(', ').toString())}
			</p>
			<p className={styles.duration}>
				<b>Duration: </b>
				{moment.duration(props.e.duration, 'minutes').format('HH:mm')} hours
			</p>
			<p className={styles.creationDate}>
				<b>Created: </b>
				{moment(props.e.creationDate, 'DD-MM-YYYY')
					.format('DD.MM.YYYY')
					.toLocaleString()}
			</p>
			<Button
				buttonText='SHOW COURSE'
				onClick={props.toggleInfo('id')}
				className={styles.button}
			/>
		</div>
	);
};
