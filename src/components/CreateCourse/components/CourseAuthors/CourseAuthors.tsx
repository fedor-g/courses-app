import React, { useState } from 'react';
import { shortenAuthors } from 'src/helpers/courseData';
import { AuthorItem } from '../AuthorItem/AuthorItem';

export const CourseAuthors = (props) => {
	const [courseAuthList, updCourseAuthList] = useState([
		{ name: 'name4 surname4' },
		{ name: 'name5 surname5' },
		{ name: 'n6 s6' },
		{ name: '12345678901234567890123456789' },
	]);

	return (
		<div className={props.className}>
			<p>
				<b>Course Authors</b>
			</p>
			{courseAuthList.map((e) => {
				return (
					<AuthorItem
						key={e.name}
						authorName={shortenAuthors(e.name)}
						create={false}
					/>
				);
			})}
		</div>
	);
};
