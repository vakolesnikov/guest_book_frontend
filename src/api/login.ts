import { AxiosResponse } from 'axios';
import { apiV1 } from './configuration';
import { IProfile } from '../types';

interface ILogin extends Omit<IProfile, '_id'> {}

export const login = (data: ILogin):Promise<AxiosResponse<IProfile>> => apiV1.post('/auth/login', data);
