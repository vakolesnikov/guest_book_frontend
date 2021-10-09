import React from 'react';
import { Link } from 'react-router-dom';

interface IToggleableLink {
  disabled: boolean,
  children: any,
  to: string
  style?: any,
}

export const ToggleableLink = ({ disabled, children, ...rest }: IToggleableLink) => (disabled ? children : <Link {...rest}>{children}</Link>);
