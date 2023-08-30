import React from 'react';
import { Header } from '../Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { userReducer } from 'src/store/user/reducer';

const initialState = {
	user: { name: 'mock name' },
};

const store = createStore(userReducer, initialState);

const Wrapper = ({ children }) => (
	<Provider store={store}>
		<BrowserRouter>{children}</BrowserRouter>
	</Provider>
);

describe('Header', () => {
	it('should display user name and have logo', async () => {
		render(<Header />, { wrapper: Wrapper });

		const userName = await screen.findByText('mock name');
		const logo = await screen.findByAltText('logo');

		expect(userName).toBeTruthy();
		expect(logo).toBeTruthy();
	});
});
