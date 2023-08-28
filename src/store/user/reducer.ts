import { UserActionTypes } from './types';

export const usersInitialState = {};

export const userReducer = (
	state = usersInitialState,
	action: UserActionTypes
) => {
	switch (action.type) {
		case 'SAVE_USER':
			return action.payload;
		case 'ADD_USER':
			return action.payload;
		case 'DELETE_USER':
			return usersInitialState;
		default:
			return state;
	}
};
