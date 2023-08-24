import { AuthorsActionTypes } from './types';

export const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case AuthorsActionTypes.SAVE_AUTHORS:
			return action.payload;
		case AuthorsActionTypes.ADD_AUTHOR:
			return [...state, action.payload];
		case AuthorsActionTypes.DELETE_AUTHOR:
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};
