import React from 'react';
import { Button } from 'src/common/Button/Button';
import styles from './coursecard.module.scss';
import moment from 'moment';
import 'moment-duration-format';

function shortenAuthors(authors: string) {
	return (
		<>{authors.length > 18 ? authors.substring(0, 18) + '...' : authors}</>
	);
}

export const CourseCard = (props) => {
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
			<div className={styles.button}>
				<Button buttonText='SHOW COURSE' function={props.showCourse} />
			</div>
		</div>
	);
};
