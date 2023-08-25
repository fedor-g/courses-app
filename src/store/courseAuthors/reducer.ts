import { CourseAuthorsActionTypes } from './types';

export const authorsInitialState = [];

export const courseAuthorsReducer = (
	state = authorsInitialState,
	action: CourseAuthorsActionTypes
) => {
	switch (action.type) {
		case 'SAVE_COURSE_AUTHORS':
			return action.payload;
		case 'ADD_COURSE_AUTHOR':
			return [...state, action.payload];
		case 'DELETE_COURSE_AUTHOR':
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};
