import { useState, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { getPosts, getUser } from 'api/index';
import {
  IGetPostsResponse,
  IPaginationState,
  IPostsFilters,
  IPostsPagination,
  IProfile,
} from 'types/index';

interface IFetchUserProps {
  id: string,
  onSuccess?: (data: AxiosResponse) => void,
  onError?: () => void,
}

interface IFetchUserHookResult {
  user: IProfile,
  isFetching: boolean
}

export const usePaginationFilters = ({ page: initialPage, pageSize: initialPageSize }: IPostsPagination): IPaginationState => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return {
    page, pageSize, setPage, setPageSize,
  };
};

export const usePostsFilters = () => {
  const [filters, setPostFilters] = useState<IPostsFilters>({});

  const setFilters = useCallback(
    (_filters: IPostsFilters) => setPostFilters((prevFilters) => ({
      ...prevFilters,
      ..._filters,
    })),
    [],
  );
  const clearFilters = () => setPostFilters({});

  return {
    setFilters, clearFilters, filters,
  };
};

export const useFetchPosts = (pagination: IPostsPagination, filters?: IPostsFilters) => {
  const {
    data: axiosData,
    refetch: refetchPosts,
    isFetching,
  } = useQuery<AxiosResponse<IGetPostsResponse>>(
    ['posts', Object.values(filters).toString(), Object.values(pagination).toString()],
    () => getPosts(pagination, filters),
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: false,
      initialData: { data: { meta: { totalCount: 0 }, result: [] } } as AxiosResponse<IGetPostsResponse>,
    },
  );

  useEffect(() => {
    refetchPosts();
  }, [filters, pagination.page]);

  return { refetchPosts, isFetching, data: axiosData.data };
};

export const useFetchUser = ({ id, onError, onSuccess }: IFetchUserProps): IFetchUserHookResult | null => {
  const { data: axiosData, isFetching } = useQuery(
    ['userProfile', id],
    () => getUser(id),
    {
      enabled: !!id,
      initialData: { data: {} } as AxiosResponse<IProfile>,
      onError,
      onSuccess,
      refetchOnWindowFocus: false,
    },
  );

  if (!id) {
    return null;
  }

  return id ? {
    user: axiosData.data,
    isFetching,
  } : null;
};
