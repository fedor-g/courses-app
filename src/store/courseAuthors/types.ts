export type AuthType = {
	id: string;
	name: string;
};

export const enum CourseAuthorsActionTypes {
	SAVE_COURSE_AUTHORS = 'SAVE_COURSE_AUTHORS',
	ADD_COURSE_AUTHOR = 'ADD_COURSE_AUTHOR',
	DELETE_COURSE_AUTHOR = 'DELETE_COURSE_AUTHOR',
}
