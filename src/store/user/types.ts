export type UserType = {
	id: string;
	name: string;
	email: string;
	role: string;
};

export type UserActionTypes =
	| { type: 'SAVE_USER'; payload }
	| { type: 'ADD_USER'; payload }
	| { type: 'DELETE_USER'; payload };
