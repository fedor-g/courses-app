import { AuthType } from './store/authors/types';
import { CourseType } from './store/courses/types';
import { UserType } from './store/user/types';

export async function login(user) {
	let response;

	try {
		response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error(error);
		return false;
	}

	const result = await response.json();

	if (result.successful === false) {
		return false;
	}

	return result;
}

export async function register(newUser) {
	let response;

	try {
		response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error(error);
		return false;
	}

	const result = await response.json();

	if (result.successful === false) {
		return false;
	}

	return result;
}

export async function logout(token: string) {
	let response;

	try {
		response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
	} catch (error) {
		console.error(error);
		return false;
	}

	if (response.status !== 200) {
		return false;
	}

	return true;
}

export async function retrieveCoursesAndAuthors() {
	const recievedCourses = await getCourses();
	const recievedAuthors = await getAuthors();

	return { courses: recievedCourses, auths: recievedAuthors };
}

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

export async function getFilteredCourses(
	dur: Array<number>,
	date: Array<Date>,
	desc: Array<string>,
	titl: Array<string>
): Promise<CourseType[]> {
	let response;

	let searchString = dur ? '&duration=' + dur.join(',') : '';
	searchString += date ? '&creationDate=' + date.join(',') : '';
	searchString += desc ? '&description=' + desc.join(',') : '';
	searchString += titl ? '&title=' + titl.join(',') : '';

	if (searchString.length === 0) {
		return [];
	}

	try {
		response = await fetch(
			'http://localhost:4000/courses/filter?' +
				new URLSearchParams(searchString),
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
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
