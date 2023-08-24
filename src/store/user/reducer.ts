import { UserActionTypes } from './types';

export const usersInitialState = [];

export const userReducer = (state = usersInitialState, action) => {
	switch (action.type) {
		case UserActionTypes.SAVE_USER:
			return action.payload;
		case UserActionTypes.ADD_USER:
			return [...state, action.payload];
		case UserActionTypes.DELETE_USER:
			return state.filter((item) => item.email !== action.payload);
		default:
			return state;
	}
};
