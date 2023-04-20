import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/store';

type PrivateRouteProps = {
  children: React.ReactNode;
};
export const WrapperWaiting = ({ children }: PrivateRouteProps) => {
  const user = useAppSelector((state) => state.user.user);
  const isBoardFetching = useAppSelector((state) => state.board.isBoardMainFetching);
  if (isBoardFetching) {
    return (
      <div
        style={{
          minHeight: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return user ? <> {children} </> : null;
};
