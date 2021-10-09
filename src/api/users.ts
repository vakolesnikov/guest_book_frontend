import { apiV1 } from './configuration';

export const getUser = (id: string) => apiV1.get(`/users/${id}`);
