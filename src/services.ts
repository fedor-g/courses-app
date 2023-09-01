import { AuthType } from './store/authors/types';
import { CourseType } from './store/courses/types';
import { UserType } from './store/user/types';

/**
 *	All api calls to back end covered
 */

// Auth

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

// Courses

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

export async function createCourse(
	inputTitle: string,
	inputDescription: string,
	inputDuration: string,
	inputAuthors: Array<string>,
	token: string
) {
	let response;

	const input = {
		title: inputTitle,
		description: inputDescription,
		duration: parseInt(inputDuration),
		authors: inputAuthors,
	};

	try {
		response = await fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(input),
		});
	} catch (error) {
		console.error(error);
		return false;
	}

	const data = await response.json();

	if (data.successful === false) {
		return false;
	}
	return true;
}

export async function getCourseById(id: string): Promise<CourseType> {
	let response;

	try {
		response = await fetch('http://localhost:4000/courses/' + id);
	} catch (error) {
		console.error(error);
		return;
	}

	const data = await response.json();

	if (data.successful === false) {
		return;
	}

	return {
		id: data.result.id,
		title: data.result.title,
		description: data.result.description,
		creationDate: data.result.creationDate,
		duration: data.result.duration,
		authors: data.result.authors,
	};
}

export async function updateCourse(
	inputId: string,
	inputTitle: string,
	inputDescription: string,
	inputDuration: string,
	inputAuthors: Array<string>,
	token: string
) {
	let response;

	const input = {
		title: inputTitle,
		description: inputDescription,
		duration: parseInt(inputDuration),
		authors: inputAuthors,
	};
	console.log('why am i here');
	try {
		response = await fetch('http://localhost:4000/courses/' + inputId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(input),
		});
	} catch (error) {
		console.error(error);
		return false;
	}
	const data = await response.json();

	if (data.successful === false) {
		return false;
	}
	return true;
}

export async function deleteCourse(id: string, token: string) {
	let response;

	try {
		response = await fetch('http://localhost:4000/courses/' + id, {
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

	const data = await response.json();

	if (data.successful === false) {
		return false;
	}
	return true;
}

// Authors

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

export async function createAuthor(inputName: string, token: string) {
	let response;

	const input = {
		name: inputName,
	};

	try {
		response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(input),
		});
	} catch (error) {
		console.error(error);
		return false;
	}

	const data = await response.json();

	if (data.successful === false) {
		return false;
	}
	return { id: data.result.id, name: data.result.name };
}

export async function getAuthorById(id: string): Promise<AuthType> {
	let response;

	try {
		response = await fetch('http://localhost:4000/authors/' + id);
	} catch (error) {
		console.error(error);
		return;
	}

	const data = await response.json();

	if (data.successful === false) {
		return;
	}
	return {
		id: data.id,
		name: data.name,
	};
}

export async function updateAuthor(
	inputId: string,
	inputName: string,
	token: string
) {
	let response;

	const user = {
		name: inputName,
	};

	try {
		response = await fetch('http://localhost:4000/authors/' + inputId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(user),
		});
	} catch (error) {
		console.error(error);
		return [];
	}

	const data = await response.json();

	if (data.successful === false) {
		return [];
	}
	return {
		id: data.reslut.id,
		name: data.result.name,
	};
}

export async function deleteAuthor(inputId: string, token: string) {
	let response;

	try {
		response = await fetch('http://localhost:4000/authors/' + inputId, {
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

	const data = await response.json();

	if (data.successful === false) {
		return false;
	}
	return true;
}

// Users

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

	return {
		id: data.result.id,
		name: data.result.name,
		email: data.result.email,
		role: data.result.role,
	};
}
