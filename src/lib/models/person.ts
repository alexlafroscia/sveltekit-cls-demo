export type PersonJSON = Pick<Person, 'id' | 'name'>;

export function toJSON(person: Person): PersonJSON {
	const { id, name } = person;

	return { id, name };
}

export class Person {
	id: number;
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
