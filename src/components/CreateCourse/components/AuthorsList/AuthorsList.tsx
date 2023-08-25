import React from 'react';
import { shortenAuthors } from 'src/helpers/courseData';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { useAppDispatch, useAppSelector } from 'src/helpers/hooks';

export const AuthorsList = (props) => {
	const dispatch = useAppDispatch();
	const authorsFromStore = useAppSelector((state) => state.authors);

	function addAuthourToCourse(id: string, name: string) {
		const author = { id: id, name: name };
		dispatch({ type: 'DELETE_AUTHOR', payload: id });
		dispatch({
			type: 'ADD_COURSE_AUTHOR',
			payload: author,
		});
	}

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
						onClick={() => addAuthourToCourse(e.id, e.name)}
					/>
				);
			})}
		</div>
	);
};
