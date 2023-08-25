import { CreateCourseAuthorsActionTypes } from './types';

export const authorsInitialState = [];

export const createCourseAuthorsReducer = (
	state = authorsInitialState,
	action: CreateCourseAuthorsActionTypes
) => {
	switch (action.type) {
		case 'SAVE_COURSE_AUTHORS':
			return action.payload;
		case 'ADD_COURSE_AUTHOR':
			return [...state, action.payload];
		case 'DELETE_COURSE_AUTHOR':
			return state.filter((item) => item.id !== action.payload);
		case 'DELETE_COURSE_AUTHORS':
			return authorsInitialState;
		default:
			return state;
	}
};
