import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { CourseCard } from '../CourseCard';
import { render, screen, waitFor } from '@testing-library/react';
import { coursesReducer } from 'src/store/courses/reducer';
import { Provider } from 'react-redux';
import { shortenAuthors } from 'src/helpers/courseData';
import { coursesTestData } from 'src/common/tests/data';
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

		await waitFor(() =>
			expect(screen.getByText('testTitle')).toBeInTheDocument()
		);
		await waitFor(() =>
			expect(screen.getByText('testDescription')).toBeInTheDocument()
		);
		await waitFor(() =>
			expect(screen.getByText('01:30 hours')).toBeInTheDocument()
		);
		const auths = shortenAuthors(initialState[0].authors.join(', '));
		await waitFor(() => expect(screen.getByText(auths)).toBeInTheDocument());
		await waitFor(() =>
			expect(screen.getByText('25.12.1999')).toBeInTheDocument()
		);
	});
});
