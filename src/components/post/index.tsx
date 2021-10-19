import React, { memo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  styled,
} from '@mui/material';
import moment from 'moment';
import { IPost } from 'types/index';
import { ToggleableLink } from 'components/customRouterComponents';
import { generatePath } from 'react-router-dom';
import { URLS } from 'configuration/routes';
import { UserAvatar } from 'components/userAvatar';

interface IPostProps extends Omit<IPost, '_id'> {
  disabledUserLink?: boolean
}

const StyledTypography = styled(Typography)({
  wordBreak: 'break-word',
  fontSize: '1rem',
});
export const Post: React.FC<IPostProps> = memo(({
  creatingDate,
  messageText,
  userId,
  userName,
  firstName,
  lastName,
  disabledUserLink,
}) => {
  const fullName = `${firstName} ${lastName} (${userName})`;
  const date = moment(Number(creatingDate)).locale('ru').calendar();

  return (
    <Grid item>
      <Card sx={{ minWidth: '100%' }}>
        <CardHeader
          avatar={(
            <ToggleableLink
              to={generatePath(URLS.profile, { id: userId })}
              style={{ textDecoration: 'none' }}
              disabled={disabledUserLink}
            >
              <UserAvatar name={firstName} width={50} height={50} />
            </ToggleableLink>
            )}
          title={fullName}
          subheader={date}
          titleTypographyProps={{
            fontSize: '1rem',
            fontWeight: '700',
          }}
        />
        <CardContent>
          <StyledTypography variant="body2" color="text.secondary">
            {messageText}
          </StyledTypography>
        </CardContent>
      </Card>
    </Grid>
  );
});
