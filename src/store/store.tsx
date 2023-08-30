import { ThunkMiddleware, configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { usersReducer } from './user/reducer';
import { createCourseAuthorsReducer } from './createCourseAuthors/reducer';
import { createAuthorsReducer } from './createAuthors/reducer';
import thunk from 'redux-thunk';

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		createAuthors: createAuthorsReducer,
		createCourseAuthors: createCourseAuthorsReducer,
		users: usersReducer,
	},
	middleware: [thunk as ThunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
