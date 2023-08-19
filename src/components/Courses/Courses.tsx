import React from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { defineAuthors } from 'src/helpers/courseData';
import { Button } from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';

function checkCourses(data) {
	if (data.coursesList.length) {
		return data.coursesList.map((e) => {
			return (
				<CourseCard
					{...e}
					key={e.id}
					authors={defineAuthors(e.authors, data.authList)}
				/>
			);
		});
	} else {
		return <EmptyCourseList />;
	}
}

export const Courses = (props) => {
	const navigate = useNavigate();
	return (
		<div className={styles.courses}>
			{checkCourses({
				authList: props.authList,
				coursesList: props.coursesList,
			})}
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
