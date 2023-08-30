import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getAuthors, getCourses } from 'src/services';
import { AppDispatch, RootState } from 'src/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const fetchCoursesAndAuthorsByThunk = () => {
	return async function (dispatch) {
		const coursesFromServer = await getCourses();
		const authorsFromServer = await getAuthors();

		dispatch({
			type: 'COUSES_LIST:GET_COURSES/ALL',
			payload: coursesFromServer,
		});
		dispatch({
			type: 'AUTHORS_LIST:GET_AUTHORS/ALL',
			payload: authorsFromServer,
		});
	};
};

export async function retrieveCoursesAndAuthors() {
	const recievedCourses = await getCourses();
	const recievedAuthors = await getAuthors();
	return { courses: recievedCourses, auths: recievedAuthors };
}
