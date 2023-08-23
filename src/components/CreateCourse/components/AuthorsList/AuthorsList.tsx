import React, { useState } from 'react';
import { shortenAuthors } from 'src/helpers/courseData';
import { AuthorItem } from '../AuthorItem/AuthorItem';

export const AuthorsList = (props) => {
	const [authList, updAuthList] = useState([
		{ name: 'name1 surname1' },
		{ name: 'name2 surname2' },
		{ name: 'n3 s3' },
		{ name: '12345678901234567890123456789' },
	]);

	function handlePush(name: string) {
		localStorage.setItem('addAuth', name);
	}

	return (
		<div className={props.className}>
			<p>
				<b>Authors List</b>
			</p>
			{authList.map((e) => {
				return (
					<AuthorItem
						key={e.name}
						authorName={shortenAuthors(e.name)}
						create={true}
						//onClick={}
					/>
				);
			})}
		</div>
	);
};
