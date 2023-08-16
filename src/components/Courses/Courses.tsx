import React from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { defineAuthors } from 'src/helpers/courseData';
import { Button } from 'src/common/Button/Button';

function checkCourses(data) {
	if (data.coursesList.length) {
		return data.coursesList.map((e) => {
			return (
				<CourseCard
					{...e}
					key={e.id}
					toggleInfo={data.toggleInfo}
					authors={defineAuthors(e.authors, data.authList)}
				/>
			);
		});
	} else {
		return <EmptyCourseList />;
	}
}

export const Courses = (props) => {
	return (
		<div className={styles.courses}>
			{checkCourses({
				authList: props.authList,
				coursesList: props.coursesList,
				toggleInfo: props.toggleInfo,
			})}
			<Button buttonText='Add New Course' className={styles.button} />
		</div>
	);
};
