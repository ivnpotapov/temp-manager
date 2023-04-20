import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/store';

type PrivateRouteProps = {
  children: React.ReactNode;
};
export const PublicRoute = ({ children }: PrivateRouteProps) => {
  const user = useAppSelector((state) => state.user.user);
  const isUserFetching = useAppSelector((state) => state.user.isUserFetching);
  if (isUserFetching) {
    return (
      <div
        style={{
          minHeight: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return user ? <Navigate to="/boards" /> : <> {children} </>;
};
