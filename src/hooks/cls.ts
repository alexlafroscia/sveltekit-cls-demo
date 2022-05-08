import type { Handle } from '@sveltejs/kit';
import { locals } from '$lib/cls';

export const cls: Handle = async ({ event, resolve }) => {
	return locals.run(event.locals, () => resolve(event));
};
