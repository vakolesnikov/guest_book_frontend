import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MomentUtils from '@date-io/moment';
import ProfileContextProvider from 'providers/profileProvider';
import App from './App';
import './configuration/i18n';

const queryClient = new QueryClient();
const SNACK_HIDE_DURATION = 3000;

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider autoHideDuration={SNACK_HIDE_DURATION}>
      <ProfileContextProvider>
        <LocalizationProvider dateAdapter={MomentUtils} locale="ru">
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </LocalizationProvider>
      </ProfileContextProvider>
    </SnackbarProvider>
  </QueryClientProvider>,
  document.getElementById('app'),
);
