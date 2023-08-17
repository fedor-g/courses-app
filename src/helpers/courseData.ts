import { mockedCoursesList } from 'src/constants';

interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: Array<string>;
}

interface Author {
	id: string;
	name: string;
}

export function defineAuthors(
	ids: Array<string>,
	mockedAuthorsList: Author[]
): string[] {
	return ids.map(
		(id) => mockedAuthorsList.find((author) => author.id === id).name
	);
}

export function defineCourse(courseId: string): Course {
	return mockedCoursesList.find((course) => course.id === courseId);
}
