import React from 'react';
import { shortenAuthors } from 'src/helpers/courseData';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { useAppSelector } from 'src/helpers/hooks';

export const AuthorsList = (props) => {
	const authorsFromStore = useAppSelector((state) => state.authors);

	return (
		<div className={props.className}>
			<p>
				<b>Authors List</b>
			</p>
			{authorsFromStore.map((e) => {
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
