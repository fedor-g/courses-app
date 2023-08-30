import { createAction, createReducer } from '@reduxjs/toolkit';
import { AuthType } from './types';

export const authorsInitialState: AuthType[] = [];

const saveAuthors = createAction<AuthType[]>('COURSE_FORM:SAVE_AUTHORS');
const addAuthor = createAction<AuthType>('COURSE_FORM:ADD_AUTHOR');
const deleteAuthor = createAction<string>('COURSE_FORM:DELETE_AUTHOR');
const deleteAuthors = createAction<string>('COURSE_FORM:DELETE_AUTHORS');

export const createAuthorsReducer = createReducer(
	authorsInitialState,
	(builder) =>
		builder
			.addCase(saveAuthors, (state, action) => action.payload)
			.addCase(addAuthor, (state, action) => [...state, action.payload])
			.addCase(deleteAuthor, (state, action) =>
				state.filter((item) => item.id !== action.payload)
			)
			.addCase(deleteAuthors, () => authorsInitialState)
);
