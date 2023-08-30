import { createAction, createReducer } from '@reduxjs/toolkit';
import { AuthType } from './types';

export const authorsInitialState: AuthType[] = [];

const loadAuthors = createAction<AuthType[]>('AUTHORS_LIST:GET_AUTHORS/ALL');
const saveAuthors = createAction<AuthType[]>('AUTHORS_LIST:SAVE_AUTHORS');
const addAuthor = createAction<AuthType>('AUTHORS_LIST:ADD_AUTHOR');
const deleteAuthors = createAction<string>('AUTHORS_LIST:DELETE_AUTHOR');

export const authorsReducer = createReducer(authorsInitialState, (builder) =>
	builder
		.addCase(loadAuthors, (state, action) => action.payload)
		.addCase(saveAuthors, (state, action) => action.payload)
		.addCase(addAuthor, (state, action) => [...state, action.payload])
		.addCase(deleteAuthors, (state, action) =>
			state.filter((item) => item.id !== action.payload)
		)
);
