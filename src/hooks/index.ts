import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { requestId } from './request-id';
import { cls } from './cls';

export const handle: Handle = sequence(requestId, cls);
