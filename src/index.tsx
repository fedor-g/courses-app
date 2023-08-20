import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { Registration } from './components/Registration/Registration';
import { mockedAuthorsList, mockedCoursesList } from './constants';
import { Login } from './components/Login/Login';
import { CreateCourse } from './components/CreateCourse/CreateCourse';

const root = ReactDOM.createRoot(document.getElementById('root'));

function PrivateRoute({ children }) {
	const token = localStorage.getItem('token');
	return token ? children : <Navigate to='/login' />;
}

root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route
					path='/courses'
					element={
						<PrivateRoute>
							<Courses
								authList={mockedAuthorsList}
								coursesList={mockedCoursesList}
							/>
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
					path='/courses/add'
					element={
						<PrivateRoute>
							<CreateCourse />
						</PrivateRoute>
					}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</BrowserRouter>
);
