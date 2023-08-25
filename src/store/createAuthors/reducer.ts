import { CreateAuthorsActionTypes } from './types';

export const authorsInitialState = [];

export const createAuthorsReducer = (
	state = authorsInitialState,
	action: CreateAuthorsActionTypes
) => {
	switch (action.type) {
		case 'CC_SAVE_AUTHORS':
			return action.payload;
		case 'CC_ADD_AUTHOR':
			return [...state, action.payload];
		case 'CC_DELETE_AUTHOR':
			return state.filter((item) => item.id !== action.payload);
		case 'CC_DELETE_AUTHORS':
			return authorsInitialState;
		default:
			return state;
	}
};
