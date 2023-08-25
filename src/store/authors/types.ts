export type AuthType = {
	id: string;
	name: string;
};

export type AuthorsActionTypes =
	| { type: 'SAVE_AUTHORS'; payload }
	| { type: 'ADD_AUTHOR'; payload }
	| { type: 'DELETE_AUTHOR'; payload };
