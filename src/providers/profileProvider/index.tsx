import React, { createContext, useState } from 'react';
import { IProfile, IProfileContext } from 'types/index';
import { AxiosResponse } from 'axios';
import { useFetchUser } from 'hooks/index';

export const ProfileContext = createContext<IProfileContext>({ profile: null, setProfile: () => {} });

const ProfileContextProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const handleSuccessUserLoading = (data: AxiosResponse<IProfile>) => {
    setProfile(data.data);
  };
  useFetchUser({
    id: sessionStorage.getItem('userId'),
    onSuccess: handleSuccessUserLoading,
  });

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
};

export default ProfileContextProvider;
