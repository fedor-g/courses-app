import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { authorsReducer } from 'src/store/authors/reducer';
import { AuthType } from 'src/store/authors/types';
import { coursesReducer } from 'src/store/courses/reducer';
import { CourseType } from 'src/store/courses/types';
import {
	coursesTestData,
	authorsTestData,
	userTestData,
} from 'src/store/tests/data';
import { userReducer } from 'src/store/user/reducer';

import { UserType } from 'src/store/user/types';
import { Courses } from '../Courses';
import { server } from 'src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const initialCoursesState: CourseType[] = coursesTestData;
const initialAuthorssState: AuthType[] = authorsTestData;
const initialuserState: UserType = userTestData;

const store = configureStore({
	reducer: {
		user: userReducer,
		courses: coursesReducer,
		authors: authorsReducer,
	},
	preloadedState: {
		user: initialuserState,
		courses: initialCoursesState,
		authors: initialAuthorssState,
	},
});

const Wrapper = ({ children }) => (
	<Provider store={store}>
		<BrowserRouter>{children}</BrowserRouter>
	</Provider>
);

describe('Courses', () => {
	it('should display something please', async () => {
		render(<Courses />, { wrapper: Wrapper });
		const items = await screen.findAllByText('testTitle');
		expect(items).toHaveLength(1);
	});
});
