import { CoursesActionTypes } from './types';

export const coursesInitialState = [];

export const coursesReducer = (
	state = coursesInitialState,
	action: CoursesActionTypes
) => {
	switch (action.type) {
		case 'SAVE_COURSES':
			return action.payload;
		case 'THUNK_SAVE_COURSES':
			return action.payload;
		case 'ADD_COURSE':
			return [...state, action.payload];
		case 'DELETE_COURSE':
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};
