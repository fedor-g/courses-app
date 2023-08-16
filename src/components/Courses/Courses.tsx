import React from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import styles from './courses.module.scss';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';

interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: Date;
	duration: number;
	authors: Array<string>;
}

interface Author {
	id: string;
	name: string;
}

function defineAuthors(ids: Array<string>, mockedAuthorsList: Author[]) {
	for (let i = 0; i < ids.length; i++) {
		mockedAuthorsList.forEach((au) => {
			if (ids[i] === au.id) {
				ids[i] = au.name;
			}
		});
	}
	return ids;
}

function checkCourses(
	mockedAuthorsList: Array<Author>,
	mockedCoursesList: Array<Course>,
	toggleInfo: (value: string) => boolean
) {
	if (mockedCoursesList.length) {
		return mockedCoursesList.map((e) => {
			e.authors = defineAuthors(e.authors, mockedAuthorsList);
			return <CourseCard {...{ e, toggleInfo }} />;
		});
	} else {
		return <EmptyCourseList />;
	}
}

export const Courses = (props) => {
	return (
		<div className={styles.courses}>
			{checkCourses(props.authList, props.coursesList, props.toggleInfo)}
		</div>
	);
};
