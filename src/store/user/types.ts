export type UserType = {
	name: string;
	email: string;
};

export const enum UserActionTypes {
	SAVE_USERS = 'SAVE_USERS',
	ADD_USER = 'ADD_USER',
	DELETE_USER = 'DELETE_USER',
}

type AddNewUserAction = {
	type: UserActionTypes.ADD_USER;
	payload: UserType;
};

export const addNewCourseAction = (courseData: UserType): AddNewUserAction => ({
	type: UserActionTypes.ADD_USER,
	payload: courseData,
});
