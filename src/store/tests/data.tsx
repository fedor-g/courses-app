import { AuthType } from '../authors/types';
import { CourseType } from '../courses/types';
import { UserType } from '../user/types';

export const coursesTestData: CourseType[] = [
	{
		id: 'testId-6077-4fc4-a519-95b59c862415',
		title: 'testTitle',
		description: 'testDescription',
		authors: [
			'testId-6ba5-40fc-a439-c4e30a373d36',
			'testId-3198-4098-b6f7-799b45903199',
			'testId-e751-4745-9af5-aa9eed0ea9ed',
		],
		duration: 90,
		creationDate: '25/12/1999',
	},
];

export const authorsTestData: AuthType[] = [
	{ name: 'author', id: 'testId-6ba5-40fc-a439-c4e30a373d36' },
	{ name: 'author2', id: 'testId-3198-4098-b6f7-799b45903199' },
	{ name: 'author3', id: 'testId-e751-4745-9af5-aa9eed0ea9ed' },
];

export const userTestData: UserType = {
	id: '1',
	name: 'John Doe',
	email: 'john.doe@example.com',
	role: 'user',
};
