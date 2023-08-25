import React, { useEffect, useState } from 'react';
import styles from './courseinfo.module.scss';
import { Button } from 'src/common/Button/Button';
import { defineAuthors, defineCourse } from 'src/helpers/courseData';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourses, getAuthors } from 'src/services';
import { CourseType } from 'src/store/courses/types';
import { AuthType } from 'src/store/authors/types';

async function defineCourses() {
	const recievedCourses = await getCourses();
	const recievedAuthors = await getAuthors();
	return { courses: recievedCourses, auths: recievedAuthors };
}

export const CourseInfo = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [courses, setCourses] = useState<CourseType[]>();
	const [authors, setAuthors] = useState<AuthType[]>();

	async function fetchCourses() {
		const result = await defineCourses();
		setCourses(result.courses);
		setAuthors(result.auths);
	}

	useEffect(() => {
		fetchCourses();
	}, []);

	const course =
		courses.length > 0 ? defineCourse(courses, params.courseId) : null;

	if (!course) {
		return null;
	}

	const auth =
		authors.length > 0 ? defineAuthors(course.authors, authors) : null;

	if (!auth) {
		return null;
	}

	return (
		<div className={styles.info}>
			<p className={styles.title}>{course.title}</p>
			<p>
				<b>Description:</b>
			</p>
			<p>{course.description}</p>
			<p>
				<b>ID</b>: {course.id}
			</p>
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
				<b>Authors:</b> {auth.join(', ')}{' '}
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
