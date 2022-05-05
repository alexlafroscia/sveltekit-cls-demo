import type { RequestHandler } from './people.d';
import { db } from '$lib/db';
import { Person, toJSON } from '$lib/models/person';

function createId(): number {
	return Math.floor(Math.random() * 100);
}

export const get: RequestHandler = () => {
	return {
		body: db.findAll(Person).map(toJSON)
	};
};

export const post: RequestHandler = async ({ request }) => {
	const { name } = await request.json();

	const newRecord = new Person(createId(), name);
	db.save(newRecord);

	return {
		status: 201,
		body: toJSON(newRecord)
	};
};
