import React from 'react';
import { useAppSelector } from 'store/store';

type PrivateWrapperProps = {
  children: React.ReactNode;
};
export const PrivateWrapper = ({ children }: PrivateWrapperProps) => {
  const user = useAppSelector((state) => state.user.user);
  return user ? <> {children} </> : null;
};
