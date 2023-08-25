import React from 'react';
import { shortenAuthors } from 'src/helpers/courseData';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { useAppDispatch, useAppSelector } from 'src/helpers/hooks';
import styles from './courseauthors.module.scss';

export const CourseAuthors = (props) => {
	const dispatch = useAppDispatch();
	const courseAuthorsFromStore = useAppSelector(
		(state) => state.createCourseAuthors
	);

	function removeAuthoursFromCourse(id: string, name: string) {
		const author = { id: id, name: name };
		dispatch({
			type: 'DELETE_COURSE_AUTHOR',
			payload: id,
		});
		dispatch({ type: 'CC_ADD_AUTHOR', payload: author });
	}

	return (
		<div className={props.className}>
			<p>
				<b>Course Authors</b>
			</p>
			{courseAuthorsFromStore.length > 0 ? (
				courseAuthorsFromStore.map((e) => {
					return (
						<AuthorItem
							key={e.name}
							authorName={shortenAuthors(e.name)}
							create={false}
							onClick={() => removeAuthoursFromCourse(e.id, e.name)}
						/>
					);
				})
			) : (
				<p className={styles.placeholder}>Author list is empty</p>
			)}
		</div>
	);
};
