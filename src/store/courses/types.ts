export type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type CoursesActionTypes =
	| { type: 'THUNK_SAVE_COURSES'; payload }
	| { type: 'SAVE_COURSES'; payload }
	| { type: 'ADD_COURSE'; payload }
	| { type: 'DELETE_COURSE'; payload };
