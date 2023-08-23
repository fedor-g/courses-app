import React, { useEffect, useState } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { defineAuthors, Course, Author } from 'src/helpers/courseData';
import { Button } from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { getAuthors, getCourses } from 'src/services';
import { useAppDispatch, useAppSelector } from 'src/helpers/hooks';
import { CoursesActionTypes } from 'src/store/courses/types';
import { AuthorsActionTypes } from 'src/store/authors/types';

function getElements(courses: Array<Course>, authors: Array<Author>) {
	if (courses.length && authors.length) {
		return courses.map((e) => {
			return (
				<CourseCard
					{...e}
					key={e.id}
					authors={defineAuthors(e.authors, authors)}
				/>
			);
		});
	} else return [];
}

async function checkCourses() {
	const recievedCourses = await getCourses();
	const recievedAuthors = await getAuthors();

	return { courses: recievedCourses, auths: recievedAuthors };
}

export const Courses = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function fetchCourses() {
			const result = await checkCourses();
			dispatch({
				type: CoursesActionTypes.SAVE_COURSES,
				payload: result.courses,
			});
			dispatch({
				type: AuthorsActionTypes.SAVE_AUTHORS,
				payload: result.auths,
			});
		}
		fetchCourses();
	}, []);

	const coursesFromStore = useAppSelector((state) => state.courses);
	const authorsFromStore = useAppSelector((state) => state.authors);

	const resultCourses = getElements(coursesFromStore, authorsFromStore);

	return (
		<div className={styles.courses}>
			{resultCourses ? resultCourses : <EmptyCourseList />}
			<Button
				buttonText='Add New Course'
				className={
					coursesFromStore.length ? styles.button : styles.buttonEmptyList
				}
				onClick={() => {
					navigate('/courses/add', { replace: true });
				}}
			/>
		</div>
	);
};
