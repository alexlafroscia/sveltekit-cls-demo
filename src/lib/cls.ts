import { AsyncLocalStorage } from 'node:async_hooks';

export const locals = new AsyncLocalStorage<App.Locals>();
