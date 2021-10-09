import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Divider,
  Typography,
  Box,
  styled,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { IProfileContext } from 'types/index';
import { URLS } from 'configuration/routes';
import { UserAvatar } from 'components/userAvatar';
import { paperProps } from './const';

const StyledLink = styled(Link)({
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
});

export const ProfileSettings = ({ setProfile, profile }: IProfileContext) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    setProfile(null);
  };

  const {
    userName, firstName, lastName, _id,
  } = profile;

  const fullName = `${firstName} ${lastName} (${userName})`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>
        {fullName}
      </Typography>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <UserAvatar name={firstName} width={40} height={40} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <StyledLink to={generatePath(URLS.profile, { id: _id })}>
            <UserAvatar name={firstName} />
            {t('profile')}
          </StyledLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
};
