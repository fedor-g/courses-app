import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CourseCard } from '../CourseCard';
import { render, screen } from '@testing-library/react';
import { coursesReducer } from 'src/store/courses/reducer';
import { Provider } from 'react-redux';
import { shortenAuthors } from 'src/helpers/courseData';
import { coursesTestData } from 'src/store/tests/data';
import { CourseType } from 'src/store/courses/types';
import { configureStore } from '@reduxjs/toolkit';

const initialState: CourseType[] = coursesTestData;

const store = configureStore({
	reducer: coursesReducer,
	preloadedState: initialState,
});

const Wrapper = ({ children }) => (
	<Provider store={store}>
		<BrowserRouter>{children}</BrowserRouter>
	</Provider>
);

describe('CourseCard', () => {
	it('should have title, desctiption, duration, auth list, creation date', async () => {
		render(<CourseCard {...initialState[0]} />, { wrapper: Wrapper });

		const title = await screen.findByText('testTitle');
		const description = await screen.findByText('testDescription');
		const duration = await screen.findByText('01:30 hours');
		const auths = shortenAuthors(initialState[0].authors.join(', '));
		const authors = await screen.findByText(auths);
		const creationDate = await screen.findByText('25.12.1999');

		expect(title).toBeTruthy();
		expect(description).toBeTruthy();
		expect(duration).toBeTruthy();
		expect(authors).toBeTruthy();
		expect(creationDate).toBeTruthy();
	});
});
