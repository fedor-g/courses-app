import { createAction, createReducer } from '@reduxjs/toolkit';
import { CourseType } from './types';

export const coursesInitialState: CourseType[] = [];

const loadCourses = createAction<CourseType[]>('COUSES_LIST:GET_COURSES/ALL');
const saveCourses = createAction<CourseType[]>('COUSES_LIST:SAVE_COURSES');
const addCourse = createAction<CourseType>('COUSES_LIST:ADD_COURSE');
const deleteCourse = createAction<string>('COUSES_LIST:DELETE_COURSE');

export const coursesReducer = createReducer(coursesInitialState, (builder) =>
	builder
		.addCase(loadCourses, (state, action) => action.payload)
		.addCase(saveCourses, (state, action) => action.payload)
		.addCase(addCourse, (state, action) => [...state, action.payload])
		.addCase(deleteCourse, (state, action) =>
			state.filter((item) => item.id !== action.payload)
		)
);
