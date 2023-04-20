import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from 'components/pages/layout/Layout';
import Login from 'components/pages/login/Login';
import Page404 from 'components/pages/page404/Page404';
import Registration from 'components/pages/registration/Registration';
import WelcomePage from 'components/pages/welcomePage/WelcomePage';
import Profile from 'components/pages/profile/Profile';
import { useAppDispatch } from 'store/store';
import jwt_decode from 'jwt-decode';
import { getTokenLocalStorage } from 'services/apiConstants';
import { DecodedToken } from 'services/userServiceTypes';
import { PrivateRoute } from './routes/PrivateRoute';
import { getCurrentUserByIdThunk } from 'store/thunks/userThunk';
import Boards from 'components/pages/boards/Boards';
import Users from 'components/pages/users/Users';
import { PublicRoute } from 'routes/PublicRoute';
import Board from 'components/pages/boards/Board';
import { userSlice } from 'store/slices/userSlice';
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getTokenLocalStorage();
    if (!token) {
      dispatch(userSlice.actions.setIsUserFetching(false));
      return;
    }
    const decodedToken = jwt_decode<DecodedToken>(token);
    console.log('decodedToken', decodedToken);
    if (decodedToken) dispatch(getCurrentUserByIdThunk(decodedToken.id));
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="registration"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route
            path="boards/*"
            element={
              <PrivateRoute>
                <Boards />
              </PrivateRoute>
            }
          />
          <Route
            path="boards/:boardId"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
          <Route path="users" element={<Users />} />
          <Route path="page404" element={<Page404 />} />
          <Route path="*" element={<Navigate to={'/page404'} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
