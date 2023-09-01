import { rest } from 'msw';
import { authorsTestData, coursesTestData } from 'src/store/tests/data';

export const handlers = [
	rest.get('http://localhost:4000/courses/all', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				successful: true,
				result: [coursesTestData],
			})
		);
	}),
	rest.get('http://localhost:4000/authors/all', (req, res, ctx) => {
		return res(
			ctx.status(200),

			ctx.json({
				successful: true,
				rest: [authorsTestData],
			})
		);
	}),
];
