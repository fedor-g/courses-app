import { AuthorsActionTypes } from './types';

export const authorsInitialState = [];

export const authorsReducer = (
	state = authorsInitialState,
	action: AuthorsActionTypes
) => {
	switch (action.type) {
		case 'THUNK_SAVE_AUTHORS':
			return action.payload;
		case 'SAVE_AUTHORS':
			return action.payload;
		case 'ADD_AUTHOR':
			return [...state, action.payload];
		case 'DELETE_AUTHOR':
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};
