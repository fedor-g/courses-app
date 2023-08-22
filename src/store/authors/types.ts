export type AuthType = {
	id: string;
	name: string;
};

export const enum AuthorsActionTypes {
	SAVE_AUTHORS = 'SAVE_AUTHORS',
	ADD_AUTHOR = 'ADD_AUTHOR',
	DELETE_AUTHOR = 'DELETE_AUTHOR',
}
