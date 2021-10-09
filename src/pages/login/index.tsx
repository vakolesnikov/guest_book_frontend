import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { login } from 'api/index';
import { ProfileContext } from 'providers/profileProvider';
import { URLS } from 'configuration/routes';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const isAuth = sessionStorage.getItem('userId');
  const { profile, setProfile } = useContext(ProfileContext);
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: (values) => {
      login(values)
        .then(({ data }) => {
          enqueueSnackbar(t('notification.loginSuccess'), { variant: 'success' });
          sessionStorage.setItem('userId', data._id);
          setProfile(data);
        })
        .catch((err) => enqueueSnackbar(err.response.data.message, { variant: 'error' }));
    },
  });

  if (profile || isAuth) {
    return <Redirect to={URLS.posts} />;
  }

  return (

    <Box display="flex" flexDirection="column" height="100%">
      <Box pt={10}>
        <Typography variant="h2" textAlign="center">
          {t('authorizationForm.authorization')}
        </Typography>

      </Box>
      <Box p={4}>
        <Container maxWidth="xs">
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" spacing={2} justifyContent="center">
              <Grid item container justifyContent="center">
                <TextField
                  name="userName"
                  label={t('authorizationForm.userName')}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  fullWidth
                />
              </Grid>
              <Grid item container justifyContent="center">
                <TextField
                  name="password"
                  label={t('authorizationForm.password')}
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {t('authorizationForm.login')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>

  );
};

export default Login;
