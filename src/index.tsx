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

root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route
					path='/courses'
					element={
						<Courses
							authList={mockedAuthorsList}
							coursesList={mockedCoursesList}
						/>
					}
				/>
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route path='/courses/add' element={<CreateCourse />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</BrowserRouter>
);
