import { CoursesActionTypes } from './types';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return action.payload;

		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];

		case CoursesActionTypes.DELETE_COURSE:
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};
