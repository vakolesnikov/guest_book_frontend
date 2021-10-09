import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, Redirect } from 'react-router-dom';
import { URLS } from 'configuration/routes';
import {
  AppBar,
  Typography,
  Box,
  Grid,
  LinearProgress,
} from '@mui/material';
import UserProfile from 'pages/userProfile';
import Posts from 'pages/posts';
import { ProfileContext } from 'providers/profileProvider';
import { ProfileSettings } from 'components/profileSettings';

const Root = () => {
  const { t } = useTranslation();
  const isAuth = sessionStorage.getItem('userId');
  const { profile, setProfile } = useContext(ProfileContext);

  if (!profile && !isAuth) {
    return <Redirect to={URLS.login} />;
  }

  if (!profile) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Box p={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="inherit" component="div">
              {t('guestBook')}
            </Typography>
            <ProfileSettings setProfile={setProfile} profile={profile} />
          </Grid>
        </Box>
      </AppBar>
      <Switch>
        <Route path={URLS.profile}>
          <UserProfile />
        </Route>
        <Route path={[URLS.posts, URLS.root]}>
          <Posts />
        </Route>
      </Switch>
    </Box>

  );
};

export default Root;
