import { AuthType } from './store/authors/types';
import { CourseType } from './store/courses/types';
import { UserType } from './store/user/types';

export async function getCourses(): Promise<CourseType[]> {
	let response;

	try {
		response = await fetch('http://localhost:4000/courses/all');
	} catch (error) {
		console.error(error);
		return [];
	}

	const data = await response.json();

	if (data.successful === false) {
		return [];
	}
	return data.result.map((course: CourseType) => ({
		id: course.id,
		title: course.title,
		description: course.description,
		creationDate: course.creationDate,
		duration: course.duration,
		authors: course.authors,
	}));
}

export async function getAuthors(): Promise<AuthType[]> {
	let response;

	try {
		response = await fetch('http://localhost:4000/authors/all');
	} catch (error) {
		console.error(error);
		return [];
	}

	const data = await response.json();

	if (data.successful === false) {
		return [];
	}
	return data.result.map((auth: AuthType) => ({
		id: auth.id,
		name: auth.name,
	}));
}

export async function checkMe(token: string): Promise<UserType> {
	let response;

	try {
		response = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
	} catch (error) {
		console.error(error);
		return null;
	}

	const data = await response.json();

	if (data.successful === false) {
		return null;
	}

	return { name: data.result.name, email: data.result.email };
}
