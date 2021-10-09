import { Dispatch, SetStateAction } from 'react';
import { AxiosResponse } from 'axios';

export interface IPost {
  _id: string;
  creatingDate: number;
  messageText: string;
  userId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
}

export interface IGetPostsResponse {
  result: IPost[],
  meta: {
    totalCount: number
  }
}

export interface IPostsFilters {
  firstName?: string,
  lastName?: string,
  userName?: string,
  startDate?: number,
  endDate?: number,
}

export interface IPostsPagination {
  page: number,
  pageSize: number,
}

export interface IPaginationState extends IPostsPagination{
  setPage: Dispatch<SetStateAction<number>>,
  setPageSize: Dispatch<SetStateAction<number>>
}

export interface IProfile {
  userName: string,
  password: string,
  age?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  _id: string,
}

export interface IProfileContext {
  profile: IProfile | null,
  setProfile: Dispatch<IProfile | null>
}
