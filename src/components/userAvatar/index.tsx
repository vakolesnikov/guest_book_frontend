import React, { memo } from 'react';
import { Avatar } from '@mui/material';
import { stringToColor } from 'utils/index';

interface IUserAvatar {
  name: string
  width?: number,
  height?: number,
}

export const UserAvatar = memo(({ width, height, name }:IUserAvatar) => (
  <Avatar sx={{ width, height, bgcolor: stringToColor(name) }}>
    {name.charAt(0).toUpperCase()}
  </Avatar>
));
