export type UserType = {
	id: string;
	name: string;
	email: string;
	role: string;
};

export const enum UserActionTypes {
	SAVE_USER = 'SAVE_USER',
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
