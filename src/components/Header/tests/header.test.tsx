import React from 'react';
import { Header } from '../Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { userReducer } from 'src/store/user/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { userTestData } from 'src/common/tests/data';

const store = configureStore({
	reducer: {
		user: userReducer,
	},
	preloadedState: {
		user: userTestData,
	},
});

const Wrapper = ({ children }) => (
	<Provider store={store}>
		<BrowserRouter>{children}</BrowserRouter>
	</Provider>
);

describe('Header', () => {
	it('should display user name and have logo', async () => {
		localStorage.setItem('token', 'token');

		render(<Header />, { wrapper: Wrapper });

		const userName = await screen.findByText('John Doe');
		const logo = await screen.findByAltText('logo');

		expect(userName).toBeTruthy();
		expect(logo).toBeTruthy();
	});
});
