export type AuthType = {
	id: string;
	name: string;
};

export type AuthorsActionTypes =
	| { type: 'THUNK_SAVE_AUTHORS'; payload }
	| { type: 'SAVE_AUTHORS'; payload }
	| { type: 'ADD_AUTHOR'; payload }
	| { type: 'DELETE_AUTHOR'; payload };
