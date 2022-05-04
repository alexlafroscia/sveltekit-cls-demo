import { expect, test, vi } from 'vitest';
import { DB } from './db';
import { Person } from '../lib/models/person';

test('using the DB', () => {
	const logger = vi.fn();
	const db = new DB({
		logger
	});

	const alex = new Person(1, 'Alex');
	const emily = new Person(2, 'Emily');

	expect(db.findAll(Person)).toEqual([]);
	expect(logger).toBeCalledWith('no records for Person');

	db.save(alex);
	db.save(emily);

	expect(db.find(Person, 1)).toBe(alex);
	expect(db.find(Person, 2)).toBe(emily);
	expect(db.find(Person, 3)).toBe(undefined);

	expect(logger).toBeCalledWith('Person#1 found');
	expect(logger).toBeCalledWith('Person#2 found');
	expect(logger).toBeCalledWith('Person#3 not found');

	expect(db.findAll(Person)).toEqual([alex, emily]);
	expect(logger).toBeCalledWith('2 records for Person');
});
