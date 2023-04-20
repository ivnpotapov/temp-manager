import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from 'store/store';
import { userSlice } from 'store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslate } from './languageContext/languageContext';
const settings = ['Profile', 'Users'];

export const HeaderAvatar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const userName = useAppSelector((state) => state.user.user?.name);
  const dispatch = useAppDispatch();
  const links = useTranslate('links.userLinks');
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
    const currentTarget = (event.target as HTMLElement).innerHTML;
    if (currentTarget === 'Logout' || currentTarget === 'Выход') {
      localStorage.clear();
      dispatch(userSlice.actions.setUser(undefined));
    }
    if (currentTarget === 'Profile') {
      navigate('/profile');
    }
  };

  return (
    <Box sx={{ pl: '20px' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Link to={setting} style={{ color: 'gray' }}>
              <Typography textAlign="center">{links.split(',')[index]}</Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" style={{ color: 'gray' }}>
            {links.split(', ')[2]}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
