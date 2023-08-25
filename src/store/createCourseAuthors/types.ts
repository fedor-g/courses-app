export type AuthType = {
	id: string;
	name: string;
};

export type CreateCourseAuthorsActionTypes =
	| { type: 'SAVE_COURSE_AUTHORS'; payload }
	| { type: 'ADD_COURSE_AUTHOR'; payload }
	| { type: 'DELETE_COURSE_AUTHOR'; payload }
	| { type: 'DELETE_COURSE_AUTHORS' };
