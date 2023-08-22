import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { usersReducer } from './user/reducer';

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		users: usersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
