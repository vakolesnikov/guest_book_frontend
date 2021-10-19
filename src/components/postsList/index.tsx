import React, { useCallback, memo } from 'react';
import {
  Box,
  Grid,
  Pagination,
  LinearProgress,
} from '@mui/material';
import { Post } from 'components/post';
import { IPaginationState, IPost } from 'types/index';

interface IPostsListPros {
  posts: IPost[],
  isFetching: boolean,
  totalCount: number,
  pagination: IPaginationState,
  disabledUserLink?: boolean,
}

export const PostsList = memo(({
  posts,
  isFetching,
  totalCount,
  pagination,
  disabledUserLink,
}: IPostsListPros) => {
  const { pageSize, setPage, page } = pagination;
  const isShowPagination = !!totalCount && (totalCount > pageSize);
  const handlePaginationChange = useCallback((e: any, value: number) => setPage(value), []);

  const pagesCount = Math.ceil(totalCount / pageSize);

  return (
    <Box p={2}>
      <Grid container spacing={2} direction="column">
        {isFetching && <LinearProgress />}
        {
          posts.map(
            ({ _id, ...rest }) => (
              <Post
                key={_id}
                disabledUserLink={disabledUserLink}
                {...rest}
              />
            ),
          )
      }

        <Grid item>
          {isShowPagination && (
            <Box pt={2}>
              <Pagination
                disabled={isFetching}
                count={pagesCount}
                page={page}
                onChange={handlePaginationChange}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
});
