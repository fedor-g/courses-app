import { UserActionTypes } from './types';

export const usersInitialState = [];

export const usersReducer = (
	state = usersInitialState,
	action: UserActionTypes
) => {
	switch (action.type) {
		case 'SAVE_USER':
			return action.payload;
		case 'ADD_USER':
			return [...state, action.payload];
		case 'DELETE_USER':
			return state.filter((item) => item.email !== action.payload);
		default:
			return state;
	}
};
