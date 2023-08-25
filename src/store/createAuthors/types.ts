export type AuthType = {
	id: string;
	name: string;
};

export type CreateAuthorsActionTypes =
	| { type: 'CC_SAVE_AUTHORS'; payload }
	| { type: 'CC_ADD_AUTHOR'; payload }
	| { type: 'CC_DELETE_AUTHOR'; payload }
	| { type: 'CC_DELETE_AUTHORS' };
