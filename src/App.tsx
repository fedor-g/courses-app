import React, { useState } from 'react';
import Header from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { mockedAuthorsList, mockedCoursesList } from 'src/constants';

function App() {
	const [info, setInfo] = useState(true);

	function toggleInfo() {
		setInfo(!info);
	}

	return (
		<div>
			<Header />
			{info ? (
				<Courses
					authList={mockedAuthorsList}
					coursesList={mockedCoursesList}
					toggleInfo={toggleInfo}
				/>
			) : (
				<></>
			)}
		</div>
	);
}

export default App;
