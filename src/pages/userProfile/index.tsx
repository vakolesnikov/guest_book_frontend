import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Breadcrumbs,
  styled,
  Divider,
} from '@mui/material';
import { UserAvatar } from 'components/userAvatar';
import { useFetchPosts, useFetchUser, usePaginationFilters } from 'hooks/index';
import { IProfile } from 'types/index';
import { URLS } from 'configuration/routes';

interface IPathParams {
  id: string
}

const StyledLink = styled(Link)({
  color: '#00000099',
  '&:hover': {
    color: '#1e88e5',
  },
});

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<IPathParams>();
  const pagination = usePaginationFilters({ page: 1, pageSize: 5 });
  const { page, pageSize } = pagination;
  const { user, isFetching } = useFetchUser({ id });
  const postsFilters = useMemo(() => ({ userName: user.userName }), [user.userName]);
  const {
    data: { result: posts, meta: { totalCount } },
    isFetching: isPostsFetching,
  } = useFetchPosts({ page, pageSize }, postsFilters);

  const {
    userName,
    firstName,
    lastName,
    _id,
    ...otherInfo
  } = user as IProfile;

  const fullName = `${firstName} ${lastName} (${userName})`;

  if (isFetching) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <Box p={2}>
        <Breadcrumbs>
          <StyledLink to={URLS.posts}>
            {t('posts.sectionName')}
          </StyledLink>
          <Typography>{t('profile')}</Typography>
        </Breadcrumbs>
      </Box>
      <Box pl={2} pr={2}>
        <Divider />
      </Box>
      <Box p={2}>
        <Grid container flexDirection="column" alignItems="center" pt={2} pb={2}>
          <Grid item>
            <UserAvatar name={firstName} width={100} height={100} />
          </Grid>
          <Grid item>
            <Typography variant="h2" textAlign="center">
              {fullName}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {Object.entries(otherInfo).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={t(`profileFields.${key}`)} secondary={value} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Container>
  );
};

export default UserProfile;
