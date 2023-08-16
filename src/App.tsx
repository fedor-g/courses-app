import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { mockedAuthorsList, mockedCoursesList } from 'src/constants';
import styles from './app.scss';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

function App() {
	const [info, setInfo] = useState('');

	function toggleInfo(value: string) {
		setInfo(value);
	}

	return (
		<div className={styles.main}>
			<Header />
			{info ? (
				<CourseInfo id={info} toggleInfo={toggleInfo} />
			) : (
				<Courses
					authList={mockedAuthorsList}
					coursesList={mockedCoursesList}
					toggleInfo={toggleInfo}
				/>
			)}
		</div>
	);
}

export default App;
