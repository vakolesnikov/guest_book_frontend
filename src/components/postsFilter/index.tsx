import React, { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { IPostsFilters } from 'types/index';
import { transformFilters } from 'utils/index';

interface IFilterConfigItem {
  type: string,
  name: ConfigItemName
}

interface IPostsFilterProps {
  open: boolean
  onClose: () => void,
  setFilters: (data: IPostsFilters) => void,
  clearFilters: () => void,
  filters: IPostsFilters,
  setPage: Dispatch<number>,
}

type ConfigItemName = 'userName' | 'firstName' | 'lastName' | 'startDate' | 'endDate';

export const PostsFilter:React.FC<IPostsFilterProps> = ({
  open,
  onClose,
  setFilters,
  clearFilters,
  setPage,
}) => {
  const { t } = useTranslation();
  const [filters, setLocalFilters] = useState<IPostsFilters>({});

  const filtersConfig: IFilterConfigItem[] = [
    { type: 'string', name: 'userName' },
    { type: 'string', name: 'firstName' },
    { type: 'string', name: 'lastName' },
    { type: 'date', name: 'startDate' },
    { type: 'date', name: 'endDate' },
  ];

  const getTextField = (
    name: ConfigItemName,
  ) => (
    <TextField
      id={name}
      label={t(`posts.filters.${name}`)}
      type="text"
      fullWidth
      onChange={(e) => setLocalFilters({ ...filters, [name]: e.target.value })}
      value={filters[name] as string || ''}
      variant="standard"
    />
  );

  const getDateField = (
    name: ConfigItemName,
  ) => (
    <DesktopDatePicker
      label={t(`posts.filters.${name}`)}
      value={filters[name] || null}
      onChange={(value) => setLocalFilters({ ...filters, [name]: value })}
      renderInput={
        (params) => <TextField {...params} fullWidth variant="standard" />
      }
    />
  );

  const getFilterComponent = ({ type, name }: IFilterConfigItem) => {
    const getComponent = () => {
      switch (type) {
        case 'text': {
          return getTextField(name);
        }

        case 'date': {
          return getDateField(name);
        }

        default: {
          return getTextField(name);
        }
      }
    };

    return (
      <Grid item key={name}>
        {getComponent()}
      </Grid>
    );
  };

  const handleSetFilters = () => {
    setFilters(transformFilters(filters));
    onClose();
    setPage(1);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box display="flex" flexDirection="column" minHeight="100%" p={2}>
        <Box pb={4}>
          <Typography variant="h5" textAlign="center">{t('filters')}</Typography>
        </Box>

        <Grid container spacing={3} flexDirection="column">
          {filtersConfig.map(getFilterComponent)}
        </Grid>
        <Box flexGrow={1} />
        <Stack spacing={1}>
          <Button onClick={handleClearFilters} variant="outlined">
            {t('posts.filters.clear')}
          </Button>
          <Button onClick={handleSetFilters} variant="contained">
            {t('posts.filters.set')}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
