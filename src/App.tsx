import React, { useState } from 'react';
import Header from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { mockedAuthorsList, mockedCoursesList } from 'src/constants';
import styles from './app.scss';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

function App() {
	const [info, setInfo] = useState(true);

	function toggleInfo() {
		setInfo(!info);
	}

	return (
		<div className={styles.main}>
			<Header />
			{info ? (
				<Courses
					authList={mockedAuthorsList}
					coursesList={mockedCoursesList}
					toggleInfo={toggleInfo}
				/>
			) : (
				<CourseInfo />
			)}
		</div>
	);
}

export default App;
