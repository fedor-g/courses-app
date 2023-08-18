import React from 'react';
import styles from './courseinfo.module.scss';
import { Button } from 'src/common/Button/Button';
import { defineAuthors, defineCourse } from 'src/helpers/courseData';
import moment from 'moment';
import { mockedAuthorsList } from 'src/constants';
import { useNavigate, useParams } from 'react-router-dom';

let course;

export const CourseInfo = () => {
	const params = useParams();
	course = defineCourse(params.courseId);
	const navigate = useNavigate();
	return (
		<div className={styles.info}>
			<p className={styles.title}>{course.title}</p>
			<p>
				<b>Description:</b>
			</p>
			<p>{course.description}</p>
			<p>ID: {course.id}</p>
			<p>
				{' '}
				<b>Duration: </b>
				{moment.duration(course.duration, 'minutes').format('HH:mm')} hours
			</p>
			<p className={styles.creationDate}>
				<b>Created: </b>
				{moment(course.creationDate, 'DD-MM-YYYY')
					.format('DD.MM.YYYY')
					.toLocaleString()}
			</p>
			<p>
				{' '}
				Authors: {defineAuthors(course.authors, mockedAuthorsList).join(
					', '
				)}{' '}
			</p>
			<Button
				buttonText='BACK'
				className={styles.button}
				onClick={() => {
					navigate('/courses', { replace: true });
				}}
			/>
		</div>
	);
};
