import React, {
  useContext, useCallback, useState,
} from 'react';
import {
  Container,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { usePaginationFilters, usePostsFilters, useFetchPosts } from 'hooks/index';
import { ProfileContext } from 'providers/profileProvider';
import { CreatePost } from 'components/createPost';
import { PostsFilter } from 'components/postsFilter';
import { PostsList } from 'components/postsList';
import { PostsControlPanel } from 'components/postsControlPanel';

const Posts: React.FC = () => {
  const { profile } = useContext(ProfileContext);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const handleShowCreateForm = useCallback(() => setIsShowCreateForm(true), []);
  const handleCloseCreateForm = useCallback(() => setIsShowCreateForm(false), []);
  const handleShowFilters = useCallback(() => setIsShowFilters(true), []);
  const handleCloseFilters = useCallback(() => setIsShowFilters(false), []);
  const pagination = usePaginationFilters({ page: 1, pageSize: 5 });
  const { filters, setFilters, clearFilters } = usePostsFilters();
  const { page, pageSize, setPage } = pagination;
  const { data, isFetching, refetchPosts } = useFetchPosts({ page, pageSize }, filters);
  const handleAfterCreatePost = useCallback(() => {
    setPage(1);
    refetchPosts();
  }, []);
  const { result, meta: { totalCount } } = data;

  return (
    <Container>
      <PostsControlPanel onShowCreateForm={handleShowCreateForm} onShowFilters={handleShowFilters} />

      <Box p={2}>
        <Divider />
      </Box>

      <PostsFilter
        open={isShowFilters}
        onClose={handleCloseFilters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        setPage={setPage}
        filters={filters}
      />
      {!isFetching && !totalCount && (
      <Typography variant="h3" textAlign="center" sx={{ pt: 10 }}>
        Сообщения не найдены
      </Typography>
      )}

      <PostsList
        posts={result}
        isFetching={isFetching}
        totalCount={totalCount}
        pagination={pagination}
      />

      { isShowCreateForm && (
      <CreatePost
        isOpen={isShowCreateForm}
        profile={profile}
        onClose={handleCloseCreateForm}
        onAfterSubmit={handleAfterCreatePost}
      />
      )}
    </Container>
  );
};

export default Posts;
