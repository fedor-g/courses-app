import { createAction, createReducer } from '@reduxjs/toolkit';
import { UserType } from './types';

export const usersInitialState: UserType = null;

const saveUser = createAction<UserType>('CURRENT_USER:SAVE_USER');
const getUser = createAction<UserType>('CURRENT_USER:GET_USERS/ME');
const deleteUser = createAction<string>('CURRENT_USER:DELETE_USER');

export const userReducer = createReducer(usersInitialState, (builder) =>
	builder
		.addCase(saveUser, (state, action) => action.payload)
		.addCase(getUser, (state, action) => action.payload)
		.addCase(deleteUser, () => usersInitialState)
);
