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
	showCourse: any;
}

interface Author {
	id: string;
	name: string;
}

function shortenAuthors(id: Array<string>, mockedAuthorsList) {
	for (let i = 0; i < id.length; i++) {
		mockedAuthorsList.forEach((au) => {
			if (id[i] === au.id) {
				id[i] = au.name;
			}
		});
	}
	return id;
}

function checkCourses(
	mockedAuthorsList: Array<Author>,
	mockedCoursesList: Array<Course>,
	toggleInfo: any
) {
	const list = mockedCoursesList.length > 0;
	if (list) {
		return mockedCoursesList.map((e) => {
			e.authors = shortenAuthors(e.authors, mockedAuthorsList);
			e.showCourse = toggleInfo;
			return <CourseCard {...e} />;
		});
	} else {
		return <EmptyCourseList />;
	}
}

export const Courses = (prop) => {
	return (
		<div className={styles.courses}>
			{checkCourses(prop.authList, prop.coursesList, prop.toggleInfo)}
		</div>
	);
};
