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
	authList: Array<Author>
): string[] {
	return ids.map((id) => authList.find((author) => author.id === id).name);
}

export function defineCourse(
	coursesList: Array<Course>,
	courseId: string
): Course {
	return coursesList.find((course) => course.id === courseId);
}
