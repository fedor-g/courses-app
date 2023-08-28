import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CourseCard } from '../CourseCard';
import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { coursesReducer } from 'src/store/courses/reducer';
import { Provider } from 'react-redux';
import { shortenAuthors } from 'src/helpers/courseData';

const mockedData = {
	id: 'testId-6077-4fc4-a519-95b59c862415',
	title: 'testTitle',
	description: 'testDescription',
	authors: ['testAuthorA', 'testAuthorB', 'testAuthorC'],
	duration: 90,
	creationDate: 25 - 12 - 1999,
};

const initialState = {
	courses: [mockedData],
};

const store = createStore(coursesReducer, initialState);

const Wrapper = ({ children }) => (
	<Provider store={store}>
		<BrowserRouter>{children}</BrowserRouter>
	</Provider>
);

describe('CourseCard', () => {
	it('should have title, desctiption, duration, auth list, creation date', async () => {
		render(<CourseCard {...mockedData} />, { wrapper: Wrapper });
	});

	const id = screen.findByText('testId-6077-4fc4-a519-95b59c862415');
	const title = screen.findByText('testTitle');
	const description = screen.findByText('testDescription');
	const duration = screen.findByText('01:30 hours');
	const auths = shortenAuthors(mockedData.authors.join(', '));
	const authors = screen.findByText(auths);
	const creationDate = screen.findByText('25.12.1999');

	expect(id).toBeTruthy();
	expect(title).toBeTruthy();
	expect(description).toBeTruthy();
	expect(duration).toBeTruthy();
	expect(authors).toBeTruthy();
	expect(creationDate).toBeTruthy();
});
