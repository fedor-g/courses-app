import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

function PrivateRoute({ children }) {
	const token = localStorage.getItem('token');
	const session = localStorage.getItem('activeSession') === 'true';
	return token && session ? children : <Navigate to='/login' />;
}

function AdminPrivateRoute({ children }) {
	const token = localStorage.getItem('token');
	const session = localStorage.getItem('activeSession') === 'true';
	const roleAdmin = localStorage.getItem('userRole') === 'admin';
	return token && session && roleAdmin ? children : <Navigate to='/courses' />;
}

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route
						path='/courses'
						element={
							<PrivateRoute>
								<Courses />
							</PrivateRoute>
						}
					/>
					<Route
						path='/courses/:courseId'
						element={
							<PrivateRoute>
								<CourseInfo />
							</PrivateRoute>
						}
					/>
					<Route
						path='/courses/edit'
						element={
							<AdminPrivateRoute>
								<CreateCourse />
							</AdminPrivateRoute>
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
				</Route>
				<Route path='*' element={<Navigate to='/courses' />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
