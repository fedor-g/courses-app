import React, { useEffect, useState } from 'react';
import styles from './createcourse.module.scss';
import { Input } from 'src/common/Input/Input';
import { Button } from 'src/common/Button/Button';
import { AuthorsList } from './components/AuthorsList/AuthorsList';
import { CourseAuthors } from './components/CourseAuthors/CourseAuthors';
import { useNavigate, useParams } from 'react-router-dom';
import {
	retrieveCoursesAndAuthors,
	useAppDispatch,
	useAppSelector,
} from 'src/helpers/hooks';
import {
	createAuthor,
	createCourse,
	getAuthors,
	getCourseById,
	updateCourse,
} from 'src/services';
import { Author } from 'src/helpers/courseData';
import moment from 'moment';

export const CreateCourse = () => {
	const token = localStorage.getItem('token');
	const params = useParams();
	const [inputTitle, setTitle] = useState('');
	const [inputDesc, setDesc] = useState('');
	const [inputDur, setDur] = useState('');
	const [addAuth, setAddAuth] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [falseTitle, setTitleError] = useState('');
	const [falseDesc, setDescError] = useState('');
	const [falseDur, setDurError] = useState('');
	const [falseAuth, setAuthError] = useState('');
	const [falseCourseAuth, setCourseAuthError] = useState('');

	const authorsFromStore: Author[] = useAppSelector(
		(state) => state.createAuthors
	);
	const courseAuthorsFromStore: Author[] = useAppSelector(
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
		async function fetchCourse(id: string) {
			const result = await getCourseById(id);
			const authors = await getAuthors();

			if (result) {
				setTitle(result.title);
				setDesc(result.description);
				setDur(result.duration.toString());

				const courseAuths = result.authors.map((id) =>
					authors.find((auth) => id === auth.id)
				);
				const ccAuths = authors.filter((auth) => !courseAuths.includes(auth));

				dispatch({
					type: 'SAVE_COURSE_AUTHORS',
					payload: courseAuths,
				});
				dispatch({
					type: 'CC_SAVE_AUTHORS',
					payload: ccAuths,
				});
			}
		}
		if (!params.courseId) {
			fetchCourses();
		} else {
			fetchCourse(params.courseId);
		}
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

		let result;

		if (!params.courseId) {
			result = await createCourse(
				title,
				desc,
				dur,
				authors.map((e) => e.id),
				token
			);
		} else {
			result = await updateCourse(
				params.courseId,
				title,
				desc,
				dur,
				authors.map((e) => e.id),
				token
			);
		}

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
					defaultValue={inputTitle}
				/>
				<p className={styles.error}>{falseTitle}</p>
				<label className={styles.param}>Description</label>
				<textarea
					className={styles.textarea}
					id='desc'
					placeholder='Input text'
					defaultValue={inputDesc}
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
					defaultValue={inputDur}
				/>
				<p className={styles.error}>{falseDur}</p>
				<p className={styles.duration}>
					{moment.duration(inputDur, 'minutes').format('h [hours], m [min]')}
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
