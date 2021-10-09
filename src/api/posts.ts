import { AxiosResponse } from 'axios';
import {
  IGetPostsResponse, IPost, IPostsFilters, IPostsPagination,
} from '../types';
import { apiV1 } from './configuration';

interface ICreatePostData extends Omit<IPost, '_id'> {}

export const getPosts = (pagination: IPostsPagination, filters?: IPostsFilters): Promise<AxiosResponse<IGetPostsResponse>> => apiV1.get(
  '/posts',
  { params: { ...pagination, ...filters } },
);

export const sendPost = (data: ICreatePostData) => apiV1.post('/posts', data);
