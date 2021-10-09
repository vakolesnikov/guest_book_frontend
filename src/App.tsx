import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { URLS } from 'configuration/routes';
import Login from 'pages/login';
import {
  Container, Paper, Box, styled,
} from '@mui/material';
import Root from './Root';

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
});
const StyledContainer = styled(Container)({ height: '100%' });

const App = () => (
  <StyledContainer>
    <StyledPaper elevation={1}>
      <Switch>
        <Route path={URLS.login}>
          <Login />
        </Route>
        <Route path={URLS.root}>
          <Root />
        </Route>
      </Switch>
      <Box flexGrow={1} />
    </StyledPaper>
  </StyledContainer>
);

export default App;
