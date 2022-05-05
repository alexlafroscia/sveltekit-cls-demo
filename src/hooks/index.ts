import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { requestId } from './request-id';

export const handle: Handle = sequence(requestId);
