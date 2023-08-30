import React, { useEffect } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { defineAuthors, Course, Author } from 'src/helpers/courseData';
import { Button } from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import {
	fetchCoursesAndAuthorsByThunk,
	useAppSelector,
} from 'src/helpers/hooks';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';

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

export const Courses = () => {
	const navigate = useNavigate();
	const dispatch =
		useDispatch<ThunkDispatch<RootState, unknown, Action<string>>>();

	useEffect(() => {
		async function retrieveCoursesAndAuthorsNew() {
			dispatch(fetchCoursesAndAuthorsByThunk());
		}
		retrieveCoursesAndAuthorsNew();
	}, []);

	const coursesFromStore = useAppSelector((state) => state.courses);
	const authorsFromStore = useAppSelector((state) => state.authors);
	const roleAdmin = localStorage.getItem('userRole') === 'admin';

	const resultCourses = getElements(coursesFromStore, authorsFromStore);

	return (
		<div className={styles.courses}>
			{resultCourses.length > 0 ? resultCourses : <EmptyCourseList />}
			{roleAdmin ? (
				<Button
					buttonText='Add New Course'
					className={
						coursesFromStore.length ? styles.button : styles.buttonEmptyList
					}
					onClick={() => {
						navigate('/courses/edit', { replace: true });
					}}
				/>
			) : (
				''
			)}
		</div>
	);
};
