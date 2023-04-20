import React from 'react';
import { useAppSelector } from 'store/store';

type PublicWrapperProps = {
  children: React.ReactNode;
};
export const PublicWrapper = ({ children }: PublicWrapperProps) => {
  const user = useAppSelector((state) => state.user.user);

  return user ? null : <> {children} </>;
};
