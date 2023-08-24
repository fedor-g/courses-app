import { CourseAuthorsActionTypes } from './types';

export const authorsInitialState = [];

export const courseAuthorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case CourseAuthorsActionTypes.SAVE_COURSE_AUTHORS:
			return action.payload;
		case CourseAuthorsActionTypes.ADD_COURSE_AUTHOR:
			return [...state, action.payload];
		case CourseAuthorsActionTypes.DELETE_COURSE_AUTHOR:
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};
