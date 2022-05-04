type Logger = (message: string) => void;

type ConstructorFor<T> = abstract new (...args: any[]) => T;

interface HasId {
	id: number;
}

interface DBOptions {
	logger: Logger;
}

export class DB {
	private logger: Logger;
	private store = new Map<ConstructorFor<any>, Map<number, any>>();

	constructor(options: DBOptions) {
		this.logger = options.logger;
	}

	/**
	 * Find a record
	 * @param model The constructor for the model you want to find
	 * @param id The ID for the instance you want to find
	 * @returns The found record, or `undefined`
	 */
	find<T>(model: ConstructorFor<T>, id: number): T | undefined {
		let result: T | undefined = undefined;

		if (this.store.has(model)) {
			const instances = this.store.get(model)!;

			if (instances) {
				result = instances.get(id);
			}
		}

		if (result) {
			this.logger(`${model.name}#${id} found`);
		} else {
			this.logger(`${model.name}#${id} not found`);
		}

		return result;
	}

	/**
	 * Return all of the stored records for a given type
	 * @param model the constructor to find all records for
	 * @returns
	 */
	findAll<T>(model: ConstructorFor<T>): T[] {
		if (this.store.has(model)) {
			const result = [...this.store.get(model)!.values()];

			this.logger(`${result.length} records for ${model.name}`);

			return result;
		}

		this.logger(`no records for ${model.name}`);

		return [];
	}

	/**
	 * Save a record into the DB
	 * @param record The record that you want to persist
	 */
	save<T extends HasId>(record: T): void {
		const model = record.constructor as ConstructorFor<T>;

		// Create the constructor-level store, if needed
		if (!this.store.has(model)) {
			this.store.set(model, new Map());
		}

		// Non-null assertion is safe, since we previously handled creating it
		const instances = this.store.get(model)!;

		instances.set(record.id, record);
	}
}

export const db = new DB({
	logger: (message) => {
		console.log(message);
	}
});
