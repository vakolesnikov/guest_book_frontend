import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import FilterAlt from '@mui/icons-material/FilterAlt';

interface IPostsControlPanel {
  onShowCreateForm: () => void,
  onShowFilters: () => void,
}

export const PostsControlPanel = ({ onShowCreateForm, onShowFilters }:IPostsControlPanel) => {
  const { t } = useTranslation();
  return (
    <Box p={2}>
      <Grid container justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={onShowCreateForm}
        >
          {t('posts.newMessage')}
        </Button>
        <Tooltip title={t('filters')}>
          <IconButton onClick={onShowFilters}>
            <FilterAlt />
          </IconButton>
        </Tooltip>
      </Grid>
    </Box>
  );
};
