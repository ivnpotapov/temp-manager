import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RuEnSwitches from './RuEnSwitches';
import { Link } from 'react-router-dom';
import { useTranslate } from 'components/languageContext/languageContext';
import { PublicWrapper } from 'routes/PublicWrapper';
import styles from './Header.module.css';
import logo from './../../../assets/svg/logo.svg';
import { HeaderAvatar } from 'components/HeaderAvatar';
import { PrivateWrapper } from 'routes/PrivateWrapper';
import { useScrollTrigger } from '@mui/material';
import { TfiAlignJustify } from 'react-icons/tfi';
import { useAppDispatch } from 'store/store';
import { addBoardFormOpenThunk } from 'store/thunks/formThunk';
interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const namingText = useTranslate('welcomeText.naming');
  const linkSignIn = useTranslate('links.signIn');
  const linkSignUp = useTranslate('links.signUp');
  const en = useTranslate('links.en');
  const ru = useTranslate('links.ru');
  const boards = useTranslate('buttons.boards');
  const addBoard = useTranslate('buttons.addBoard');
  const dispatch = useAppDispatch();
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  const navItems = [
    {
      name: linkSignIn,
      to: '/login',
    },
    {
      name: linkSignUp,
      to: '/registration',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClickAddBoard = () => {
    dispatch(addBoardFormOpenThunk());
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
      >
        <Link to="/" data-testid="welcome" style={{ textDecoration: 'none' }}>
          <div className={styles.logo}>
            <img src={logo} className={styles.logotype} />
            <div className={styles.naming} style={{ color: 'black', fontWeight: '700' }}>
              {namingText}
            </div>
          </div>
        </Link>
      </Typography>
      <Divider />
      <List>
        <PublicWrapper>
          {navItems.map((item) => (
            <Link key={item.name} to={item.to} data-testid={item.name}>
              <ListItem disablePadding key={item.name}>
                <ListItemButton sx={{ textAlign: 'center', color: 'gray' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </PublicWrapper>

        <PrivateWrapper>
          <Link to={'boards'}>
            <Button
              sx={{
                color: 'gray',
                width: '121px',
                fontWeight: '600',
                textTransform: 'none',
              }}
            >
              {boards}
            </Button>
          </Link>
          <Button
            sx={{
              color: 'gray',
              width: '121px',
              fontWeight: '600',
              padding: '6px 0',
              textTransform: 'none',
            }}
          >
            {addBoard}
          </Button>
        </PrivateWrapper>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', top: '0', zIndex: '1' }} position="sticky">
      <AppBar
        component="nav"
        position="sticky"
        sx={{
          color: trigger ? 'black' : 'white',
          fontWeight: '500',
          boxShadow: trigger
            ? '0px 2px 4px -1px rgb(0 0 0 / 0%)'
            : '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: trigger ? 'white' : '#0070A0',
            // transition: '1s',
            color: trigger ? 'rgb(133, 133, 133)' : 'white',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { sm: 'none' } }}
          >
            {<TfiAlignJustify />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/" data-testid="welcome" style={{ textDecoration: 'none' }}>
              <div className={styles.logo}>
                <img src={logo} className={styles.logotype} />
                <Box
                  className={styles.naming}
                  sx={{
                    color: trigger ? 'rgb(133, 133, 133)' : 'white',
                    fontSize: '0.875rem',
                  }}
                >
                  {namingText}
                </Box>
              </div>
            </Link>
          </Typography>
          <Box sx={{ m: '0 auto', display: { xs: 'none', sm: 'block' } }}>
            <PrivateWrapper>
              <Link to={'boards'}>
                <Button
                  sx={{
                    color: trigger ? 'rgb(133, 133, 133)' : 'white',
                    width: '121px',
                    fontWeight: '600',
                    textTransform: 'none',
                  }}
                >
                  {boards}
                </Button>
              </Link>
              <Button
                sx={{
                  color: trigger ? 'rgb(133, 133, 133)' : 'white',
                  width: '121px',
                  fontWeight: '600',
                  padding: '6px 0',
                  textTransform: 'none',
                }}
                onClick={handleClickAddBoard}
              >
                {addBoard}
              </Button>
            </PrivateWrapper>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              width: '120px',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              fontSize: '0.875rem',
            }}
          >
            {ru}
            <RuEnSwitches />
            {en}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              justifyContent: 'flex-end',
            }}
          >
            <PublicWrapper>
              {navItems.map((item) => (
                <Link key={item.name} to={item.to} data-testid={item.name}>
                  <Button
                    sx={{
                      color: trigger ? 'rgb(133, 133, 133)' : 'white',
                      width: '123px',
                      fontWeight: '600',
                      textTransform: 'none',
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </PublicWrapper>
          </Box>
          <PrivateWrapper>
            <HeaderAvatar />
          </PrivateWrapper>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
