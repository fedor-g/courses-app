import React from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { defineAuthors } from 'src/helpers/courseData';

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
		</div>
	);
};
