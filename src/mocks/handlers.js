import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:4000/courses/all', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.set('Content-Type', 'application/json'),
			ctx.body({
				result: [
					{
						title: 'testTitle',
						description: 'testDescription',
						authors: [
							'testId-6ba5-40fc-a439-c4e30a373d36',
							'testId-3198-4098-b6f7-799b45903199',
							'testId-e751-4745-9af5-aa9eed0ea9ed',
						],
						duration: 90,
						creationDate: '25/12/1999',
						id: 'testId-6077-4fc4-a519-95b59c862415',
					},
				],
			})
		);
	}),
	rest.get('http://localhost:4000/authors/all', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.set('Content-Type', 'application/json'),
			ctx.body({
				rest: [
					{ name: 'author', id: 'testId-6ba5-40fc-a439-c4e30a373d36' },
					{ name: 'author2', id: 'testId-3198-4098-b6f7-799b45903199' },
					{ name: 'author3', id: 'testId-e751-4745-9af5-aa9eed0ea9ed' },
				],
			})
		);
	}),
];
