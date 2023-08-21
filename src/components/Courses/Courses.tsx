import React, { ReactNode, useEffect, useState } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { defineAuthors } from 'src/helpers/courseData';
import { Button } from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { getAuthors, getCourses } from 'src/services';

async function checkCourses(): Promise<ReactNode[]> {
	const recievedCourses = await getCourses();
	const recievedAuthors = await getAuthors();

	if (recievedCourses.length) {
		return recievedCourses.map((e) => {
			return (
				<CourseCard
					{...e}
					key={e.id}
					authors={defineAuthors(e.authors, recievedAuthors)}
				/>
			);
		});
	} else {
		return [<EmptyCourseList key='empty' />];
	}
}

export const Courses = (props) => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		async function fetchCourses() {
			const result = await checkCourses();
			setCourses(result);
		}
		fetchCourses();
	}, []);

	return (
		<div className={styles.courses}>
			{courses.length ? courses : <>Sorry</>}
			<Button
				buttonText='Add New Course'
				className={
					props.coursesList.length ? styles.button : styles.buttonEmptyList
				}
				onClick={() => {
					navigate('/courses/add', { replace: true });
				}}
			/>
		</div>
	);
};
