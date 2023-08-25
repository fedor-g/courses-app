import React, { useEffect, useState } from 'react';
import styles from './createcourse.module.scss';
import { Input } from 'src/common/Input/Input';
import { Button } from 'src/common/Button/Button';
import { AuthorsList } from './components/AuthorsList/AuthorsList';
import { CourseAuthors } from './components/CourseAuthors/CourseAuthors';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/helpers/hooks';
import {
	createAuthor,
	createCourse,
	retrieveCoursesAndAuthors,
} from 'src/services';
import { Author } from 'src/helpers/courseData';
import moment from 'moment';

export const CreateCourse = (props) => {
	const token = localStorage.getItem('token');
	const [inputTitle, setTitle] = useState(props.title);
	const [inputDesc, setDesc] = useState(props.desc);
	const [inputDur, setDur] = useState(props.dur);
	const [inputAuth, setAuth] = useState('');
	const [addAuth, setAddAuth] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [falseTitle, setTitleError] = useState('');
	const [falseDesc, setDescError] = useState('');
	const [falseDur, setDurError] = useState('');
	const [falseAuth, setAuthError] = useState('');
	const [falseCourseAuth, setCourseAuthError] = useState('');

	const authorsFromStore: Array<Author> = useAppSelector(
		(state) => state.createAuthors
	);
	const courseAuthorsFromStore = useAppSelector(
		(state) => state.createCourseAuthors
	);

	useEffect(() => {
		async function fetchCourses() {
			const result = await retrieveCoursesAndAuthors();
			dispatch({
				type: 'CC_SAVE_AUTHORS',
				payload: result.auths,
			});
		}
		fetchCourses();
	}, []);

	async function handleSubmit(event) {
		setTitleError('');
		setDescError('');
		setDurError('');
		setAuthError('');
		setCourseAuthError('');
		event.preventDefault();

		const title: string = event.target.title.value;
		const desc: string = event.target.desc.value;
		const dur: string = event.target.duration.value;
		const authors: Author[] = courseAuthorsFromStore;

		let fail = false;

		if (!title) {
			setTitleError(() => 'Title is required');
			fail = true;
		} else if (title.length < 2) {
			setTitleError(() => 'Text length should be at least 2 characters');
			fail = true;
		}
		if (!desc) {
			setDescError(() => 'Description is required');
			fail = true;
		} else if (desc.length < 2) {
			setDescError(() => 'Text length should be at least 2 characters');
			fail = true;
		}
		if (!dur) {
			setDurError(() => 'Course duration is required');
			fail = true;
		} else if (parseInt(dur) < 1) {
			setDurError(() => 'Course duration is incorrect');
			fail = true;
		} else if (parseInt(dur) > 1000) {
			setDurError(() => 'Course duration is unreal');
			fail = true;
		}
		if (!authors || authors.length < 1) {
			setCourseAuthError(() => 'Course author is required');
			fail = true;
		}

		if (fail) return false;

		const result = await createCourse(
			title,
			desc,
			dur,
			authors.map((e) => e.id),
			token
		);

		if (result) {
			clearCourseAuthors();
			navigate('/courses', { replace: true });
		} else {
			return false;
		}
	}

	async function handleAddAuth(event) {
		setAuthError('');
		event.preventDefault();
		let fail = false;
		const author = addAuth;

		if (!author) {
			setAuthError(() => 'Author name is required');
			fail = true;
		} else if (author.length < 2) {
			setAuthError(() => 'Text length should be at least 2 characters');
			fail = true;
		} else if (authorsFromStore.filter((e) => e.name === author).length > 0) {
			setAuthError(() => 'Author already exists');
			fail = true;
		}

		if (fail) return false;

		const request = await createAuthor(author, token);

		if (!request) return false;

		dispatch({
			type: 'CC_ADD_AUTHOR',
			payload: request,
		});
	}

	function clearCourseAuthors() {
		dispatch({
			type: 'CC_DELETE_AUTHORS',
		});
		dispatch({
			type: 'DELETE_COURSE_AUTHORS',
		});
	}

	return (
		<div className={styles.createcourse}>
			<p className={styles.title}>Course Edit/Create page</p>
			<form className={styles.form} onSubmit={handleSubmit}>
				<p className={styles.section}>Main info</p>
				<label className={styles.param}>Title</label>
				<Input
					className={styles.input}
					id='title'
					label='title'
					placeholderText='Input text'
				/>
				<p className={styles.error}>{falseTitle}</p>
				<label className={styles.param}>Description</label>
				<textarea
					className={styles.textarea}
					placeholder='Input text'
					id='desc'
				/>
				<p className={styles.error}>{falseDesc}</p>
				<p className={styles.section}>Duration</p>
				<label className={styles.param}>Duration</label>
				<Input
					className={styles.input}
					id='duration'
					label='duration'
					placeholderText='Input duration'
					onChange={(e) => setDur(e.target.value)}
				/>
				<p className={styles.error}>{falseDur}</p>
				<p className={styles.duration}>
					{moment.duration(inputDur, 'minutes').format('HH:mm')} hours
				</p>
				<p className={styles.authSection}>Authors</p>
				<label className={styles.param}>Author name</label>
				<Input
					className={styles.input}
					id='author'
					label='author'
					placeholderText='Add authors to authors list'
					onChange={(e) => setAddAuth(e.target.value)}
				/>
				<p className={styles.error}>{falseAuth}</p>
				<Button
					className={styles.addAuthButton}
					buttonText={'CREATE AUTHOR'}
					type='button'
					onClick={handleAddAuth}
				/>
				<AuthorsList className={styles.authList} />
				<p className={styles.createCourseError}>{falseCourseAuth}</p>
				<CourseAuthors className={styles.courseAuthList} />
				<Button
					className={styles.saveButton}
					buttonText={'SAVE COURSE'}
					type='submit'
				/>
			</form>
			<Button
				buttonText='BACK'
				className={styles.backButton}
				onClick={() => {
					clearCourseAuthors();
					navigate('/courses', { replace: true });
				}}
			/>
		</div>
	);
};
